import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import { logActivity } from "./activityLog.service.js";

const TAX_TYPES = ["PND50", "PND51", "FINANCIAL_STATEMENT"];

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

const ensureRowsExist = async (customerIds, year) => {
  const data = [];

  for (const customerId of customerIds) {
    for (const taxType of TAX_TYPES) {
      data.push({ customerId, year, taxType });
    }
  }

  if (data.length) {
    await prisma.annualTax.createMany({
      data,
      skipDuplicates: true,
    });
  }
};

export const getAnnualTaxGridService = async (year) => {
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
    year
  );

  const records = await prisma.annualTax.findMany({
    where: {
      year,
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

export const getAnnualTaxByCustomerService = async (customerId, year) => {
  const customer = await ensureCustomerExists(customerId);

  await ensureRowsExist([customerId], year);

  const records = await prisma.annualTax.findMany({
    where: {
      customerId,
      year,
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
    items: TAX_TYPES.map((taxType) => byType[taxType]),
  };
};

export const updateAnnualTaxService = async (
  customerId,
  year,
  items,
  actingUserId
) => {
  await ensureCustomerExists(customerId);

  const results = [];

  for (const item of items) {
    const { taxType, status, submittedAt, remark } = item;

    const updated = await prisma.annualTax.upsert({
      where: {
        customerId_year_taxType: {
          customerId,
          year,
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
    action: "UPDATE_ANNUAL_TAX",
    module: "customer",
    recordId: customerId,
    description: `Updated annual tax for ${year}`,
  });

  return results;
};
