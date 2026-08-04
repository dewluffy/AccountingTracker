import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import { logActivity } from "./activityLog.service.js";

const TAX_TYPES = [
  "WHT_PND1",
  "WHT_PND3",
  "WHT_PND53",
  "WHT_PND54",
  "VAT_PP30",
  "VAT_PP36",
  "SBT_PT40",
  "SSO",
];

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

const ensureRowsExist = async (customerIds, year, month) => {
  const data = [];

  for (const customerId of customerIds) {
    for (const taxType of TAX_TYPES) {
      data.push({ customerId, year, month, taxType });
    }
  }

  if (data.length) {
    await prisma.monthlyTax.createMany({
      data,
      skipDuplicates: true,
    });
  }
};

export const getMonthlyTaxGridService = async (year, month) => {
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

  await ensureRowsExist(
    customers.map((customer) => customer.id),
    year,
    month
  );

  const records = await prisma.monthlyTax.findMany({
    where: {
      year,
      month,
      customerId: {
        in: customers.map((customer) => customer.id),
      },
    },
  });

  const grouped = {};

  for (const record of records) {
    grouped[record.customerId] = grouped[record.customerId] || {};
    grouped[record.customerId][record.taxType] = record;
  }

  return customers.map((customer) => ({
    customerId: customer.id,
    customerCode: customer.code,
    customerName: customer.name,
    responsible: customer.assignments[0]?.user || null,
    taxes: TAX_TYPES.map((taxType) => ({
      taxType,
      status: grouped[customer.id]?.[taxType]?.status || "NOT_STARTED",
    })),
  }));
};

export const getMonthlyTaxByCustomerService = async (customerId, year, month) => {
  const customer = await ensureCustomerExists(customerId);

  await ensureRowsExist([customerId], year, month);

  const records = await prisma.monthlyTax.findMany({
    where: {
      customerId,
      year,
      month,
    },
  });

  const byType = {};

  for (const record of records) {
    byType[record.taxType] = record;
  }

  const primaryAssignment = await prisma.customerAssignment.findFirst({
    where: {
      customerId,
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
  });

  return {
    customer: {
      id: customer.id,
      code: customer.code,
      name: customer.name,
    },
    responsible: primaryAssignment?.user || null,
    year,
    month,
    items: TAX_TYPES.map((taxType) => byType[taxType]),
  };
};

export const updateMonthlyTaxService = async (
  customerId,
  year,
  month,
  items,
  actingUserId
) => {
  await ensureCustomerExists(customerId);

  const results = [];

  for (const item of items) {
    const { taxType, status, submittedAt, remark } = item;

    const updated = await prisma.monthlyTax.upsert({
      where: {
        customerId_year_month_taxType: {
          customerId,
          year,
          month,
          taxType,
        },
      },
      update: {
        status,
        submittedAt: submittedAt ? new Date(submittedAt) : null,
        remark: remark || null,
      },
      create: {
        customerId,
        year,
        month,
        taxType,
        status,
        submittedAt: submittedAt ? new Date(submittedAt) : null,
        remark: remark || null,
      },
    });

    results.push(updated);
  }

  await logActivity({
    userId: actingUserId,
    action: "UPDATE_MONTHLY_TAX",
    module: "customer",
    recordId: customerId,
    description: `Updated monthly tax for ${String(month).padStart(2, "0")}/${year}`,
  });

  return results;
};
