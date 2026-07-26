import prisma from "../config/prisma.js";

const computeAggregateStatus = (statuses) => {
  if (statuses.every((status) => status === "COMPLETED")) {
    return "Completed";
  }

  if (statuses.every((status) => status === "NOT_STARTED")) {
    return "Pending";
  }

  return "In Progress";
};

export const getReportsService = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [
    totalCustomers,
    monthlyTaxCompletedCount,
    monthlyTaxTotalCount,
    annualTaxCompletedCount,
    annualTaxTotalCount,
    pendingWork,
  ] = await Promise.all([
    prisma.customer.count({ where: { status: "ACTIVE" } }),
    prisma.monthlyTax.count({ where: { year, month, status: "COMPLETED" } }),
    prisma.monthlyTax.count({ where: { year, month } }),
    prisma.annualTax.count({ where: { year, status: "COMPLETED" } }),
    prisma.annualTax.count({ where: { year } }),
    prisma.customerMonthlyWork.count({
      where: {
        OR: [
          { expenseStatus: { not: "COMPLETED" } },
          { incomeStatus: { not: "COMPLETED" } },
          { bankStatus: { not: "COMPLETED" } },
        ],
      },
    }),
  ]);

  const customers = await prisma.customer.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const [monthlyRecords, annualRecords] = await Promise.all([
    prisma.monthlyTax.findMany({ where: { year, month } }),
    prisma.annualTax.findMany({ where: { year } }),
  ]);

  const monthlyByCustomer = {};

  for (const record of monthlyRecords) {
    monthlyByCustomer[record.customerId] = monthlyByCustomer[record.customerId] || [];
    monthlyByCustomer[record.customerId].push(record.status);
  }

  const annualByCustomer = {};

  for (const record of annualRecords) {
    annualByCustomer[record.customerId] = annualByCustomer[record.customerId] || [];
    annualByCustomer[record.customerId].push(record.status);
  }

  const monthlyTaxStatus = customers
    .filter((customer) => monthlyByCustomer[customer.id])
    .map((customer) => ({
      customerName: customer.name,
      period: `${String(month).padStart(2, "0")}/${year}`,
      status: computeAggregateStatus(monthlyByCustomer[customer.id]),
    }));

  const annualTaxStatus = customers
    .filter((customer) => annualByCustomer[customer.id])
    .map((customer) => ({
      customerName: customer.name,
      period: String(year),
      status: computeAggregateStatus(annualByCustomer[customer.id]),
    }));

  const staff = await prisma.user.findMany({
    where: { isActive: true },
    select: { id: true, firstName: true, lastName: true },
  });

  const assignments = await prisma.customerAssignment.findMany({
    select: { userId: true, customerId: true },
  });

  const customerIdsByStaff = {};

  for (const assignment of assignments) {
    customerIdsByStaff[assignment.userId] =
      customerIdsByStaff[assignment.userId] || new Set();
    customerIdsByStaff[assignment.userId].add(assignment.customerId);
  }

  const staffWorkload = staff
    .map((person) => {
      const customerIds = customerIdsByStaff[person.id] || new Set();

      let assigned = 0;
      let completed = 0;

      for (const record of monthlyRecords) {
        if (customerIds.has(record.customerId)) {
          assigned += 1;

          if (record.status === "COMPLETED") {
            completed += 1;
          }
        }
      }

      return {
        staffName: `${person.firstName} ${person.lastName}`,
        assigned,
        completed,
      };
    })
    .filter((row) => row.assigned > 0);

  return {
    summary: {
      totalCustomers,
      monthlyTaxCompleted: `${monthlyTaxCompletedCount}/${monthlyTaxTotalCount}`,
      annualTaxCompleted: `${annualTaxCompletedCount}/${annualTaxTotalCount}`,
      pendingTasks: pendingWork,
    },
    monthlyTaxStatus,
    annualTaxStatus,
    staffWorkload,
  };
};
