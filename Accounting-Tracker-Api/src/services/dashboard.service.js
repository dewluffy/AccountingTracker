import prisma from "../config/prisma.js";

const TAX_TYPE_LABELS = {
  WHT_PND1: "ภงด.1",
  WHT_PND3: "ภงด.3",
  WHT_PND53: "ภงด.53",
  WHT_PND54: "ภงด.54",
  VAT_PP30: "ภพ.30",
  VAT_PP36: "ภพ.36",
  SBT_PT40: "ภธ.40",
  SSO: "ประกันสังคม",
};

const WORK_SECTION_LABELS = {
  expense: "Expense Recording",
  income: "Income Recording",
  bank: "Bank Reconciliation",
};

export const getDashboardService = async (currentUserId) => {
  const now = new Date();
  const year = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Monthly tax filings are always for the prior month's period
  // (e.g. the July period is filed in August), so "this month's"
  // pending monthly tax work refers to last month's period.
  const monthlyPeriodYear = currentMonth === 1 ? year - 1 : year;
  const monthlyPeriodMonth = currentMonth === 1 ? 12 : currentMonth - 1;

  const [
    totalCustomers,
    pendingMonthlyTax,
    pendingAnnualTax,
    pendingWork,
  ] = await Promise.all([
    prisma.customer.count({
      where: { status: "ACTIVE" },
    }),
    prisma.monthlyTax.count({
      where: {
        year: monthlyPeriodYear,
        month: monthlyPeriodMonth,
        status: { not: "COMPLETED" },
      },
    }),
    prisma.annualTax.count({
      where: { year, status: { not: "COMPLETED" } },
    }),
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

  const pendingMonthlyItems = await prisma.monthlyTax.findMany({
    where: {
      year: monthlyPeriodYear,
      month: monthlyPeriodMonth,
      status: { not: "COMPLETED" },
    },
    include: {
      customer: { select: { id: true, name: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  const myWork = await prisma.customerMonthlyWork.findMany({
    where: {
      customer: {
        assignments: {
          some: { userId: currentUserId },
        },
      },
      OR: [
        { expenseStatus: { not: "COMPLETED" } },
        { incomeStatus: { not: "COMPLETED" } },
        { bankStatus: { not: "COMPLETED" } },
      ],
    },
    include: {
      customer: { select: { id: true, name: true } },
    },
  });

  const myTasks = [];

  for (const work of myWork) {
    for (const section of ["expense", "income", "bank"]) {
      const status = work[`${section}Status`];

      if (status !== "COMPLETED") {
        myTasks.push({
          customerName: work.customer.name,
          section: WORK_SECTION_LABELS[section],
          status,
        });
      }
    }
  }

  const [customers, monthlyPendingByCustomer, annualPendingByCustomer, workRows] =
    await Promise.all([
      prisma.customer.findMany({
        where: { status: "ACTIVE" },
        select: { id: true, name: true },
      }),
      prisma.monthlyTax.groupBy({
        by: ["customerId"],
        where: {
          year: monthlyPeriodYear,
          month: monthlyPeriodMonth,
          status: { not: "COMPLETED" },
        },
        _count: { _all: true },
      }),
      prisma.annualTax.groupBy({
        by: ["customerId"],
        where: { year, status: { not: "COMPLETED" } },
        _count: { _all: true },
      }),
      prisma.customerMonthlyWork.findMany({
        select: {
          customerId: true,
          expenseStatus: true,
          incomeStatus: true,
          bankStatus: true,
        },
      }),
    ]);

  const pendingCountByCustomer = {};

  for (const row of monthlyPendingByCustomer) {
    pendingCountByCustomer[row.customerId] =
      (pendingCountByCustomer[row.customerId] || 0) + row._count._all;
  }

  for (const row of annualPendingByCustomer) {
    pendingCountByCustomer[row.customerId] =
      (pendingCountByCustomer[row.customerId] || 0) + row._count._all;
  }

  for (const row of workRows) {
    const pendingSections = [
      row.expenseStatus,
      row.incomeStatus,
      row.bankStatus,
    ].filter((status) => status !== "COMPLETED").length;

    pendingCountByCustomer[row.customerId] =
      (pendingCountByCustomer[row.customerId] || 0) + pendingSections;
  }

  const topCustomers = customers
    .map((customer) => ({
      customerId: customer.id,
      customerName: customer.name,
      pendingCount: pendingCountByCustomer[customer.id] || 0,
    }))
    .filter((item) => item.pendingCount > 0)
    .sort((a, b) => b.pendingCount - a.pendingCount)
    .slice(0, 5);

  const workStatusCounts = {
    PENDING: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
    WAITING: 0,
  };

  for (const row of workRows) {
    for (const status of [
      row.expenseStatus,
      row.incomeStatus,
      row.bankStatus,
    ]) {
      workStatusCounts[status] = (workStatusCounts[status] || 0) + 1;
    }
  }

  const workStatusBreakdown = Object.entries(workStatusCounts).map(
    ([status, count]) => ({ status, count })
  );

  return {
    stats: {
      totalCustomers,
      pendingMonthlyTax,
      pendingAnnualTax,
      currentTasks: pendingWork,
    },
    pendingThisMonth: pendingMonthlyItems.map((item) => ({
      customerName: item.customer.name,
      taxType: TAX_TYPE_LABELS[item.taxType] || item.taxType,
      period: `${String(item.month).padStart(2, "0")}/${item.year}`,
    })),
    myTasks,
    topCustomers,
    workStatusBreakdown,
  };
};
