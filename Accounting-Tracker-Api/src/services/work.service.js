import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import { logActivity } from "./activityLog.service.js";

const ensureCustomerExists = async (customerId) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw createError(404, "Customer not found");
  }

  return customer;
};

const computeOverallStatus = (record) => {
  const statuses = [
    record.expenseStatus,
    record.incomeStatus,
    record.bankStatus,
  ];

  if (statuses.every((status) => status === "COMPLETED")) {
    return "COMPLETED";
  }

  if (statuses.includes("IN_PROGRESS")) {
    return "IN_PROGRESS";
  }

  if (statuses.includes("WAITING")) {
    return "WAITING";
  }

  return "PENDING";
};

export const getWorkBoardService = async () => {
  const customers = await prisma.customer.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      assignments: {
        where: {
          staffRole: "PRIMARY",
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  if (customers.length) {
    await prisma.customerMonthlyWork.createMany({
      data: customers.map((customer) => ({ customerId: customer.id })),
      skipDuplicates: true,
    });
  }

  const records = await prisma.customerMonthlyWork.findMany({
    where: {
      customerId: {
        in: customers.map((customer) => customer.id),
      },
    },
  });

  const byCustomer = {};

  for (const record of records) {
    byCustomer[record.customerId] = record;
  }

  return customers.map((customer) => {
    const record = byCustomer[customer.id];

    return {
      customerId: customer.id,
      customerName: customer.name,
      responsible: customer.assignments[0]?.user || null,
      expense: {
        month: record.expenseMonth,
        year: record.expenseYear,
        status: record.expenseStatus,
      },
      income: {
        month: record.incomeMonth,
        year: record.incomeYear,
        status: record.incomeStatus,
      },
      bank: {
        month: record.bankMonth,
        year: record.bankYear,
        status: record.bankStatus,
      },
      status: computeOverallStatus(record),
      updatedAt: record.updatedAt,
    };
  });
};

export const getWorkByCustomerService = async (customerId) => {
  const customer = await ensureCustomerExists(customerId);

  const record = await prisma.customerMonthlyWork.upsert({
    where: {
      customerId,
    },
    update: {},
    create: {
      customerId,
    },
  });

  return {
    customer: {
      id: customer.id,
      code: customer.code,
      name: customer.name,
    },
    expense: {
      month: record.expenseMonth,
      year: record.expenseYear,
      status: record.expenseStatus,
      remark: record.expenseRemark,
    },
    income: {
      month: record.incomeMonth,
      year: record.incomeYear,
      status: record.incomeStatus,
      remark: record.incomeRemark,
    },
    bank: {
      month: record.bankMonth,
      year: record.bankYear,
      status: record.bankStatus,
      remark: record.bankRemark,
    },
    updatedAt: record.updatedAt,
  };
};

export const updateWorkService = async (customerId, data, updatedByUserId) => {
  await ensureCustomerExists(customerId);

  const { expense, income, bank } = data;

  const values = {
    expenseMonth: expense.month ?? null,
    expenseYear: expense.year ?? null,
    expenseStatus: expense.status,
    expenseRemark: expense.remark || null,

    incomeMonth: income.month ?? null,
    incomeYear: income.year ?? null,
    incomeStatus: income.status,
    incomeRemark: income.remark || null,

    bankMonth: bank.month ?? null,
    bankYear: bank.year ?? null,
    bankStatus: bank.status,
    bankRemark: bank.remark || null,

    updatedBy: updatedByUserId,
  };

  const record = await prisma.customerMonthlyWork.upsert({
    where: {
      customerId,
    },
    update: values,
    create: {
      customerId,
      ...values,
    },
  });

  await logActivity({
    userId: updatedByUserId,
    action: "UPDATE_WORK",
    module: "customer",
    recordId: customerId,
    description: "Updated current work status",
  });

  return record;
};
