import prisma from "../config/prisma.js";

export const logActivity = async ({
  userId,
  action,
  module,
  recordId,
  description,
}) => {
  await prisma.activityLog.create({
    data: {
      userId,
      action,
      module,
      recordId,
      description,
    },
  });
};

export const getActivityLogsByRecordService = async (module, recordId) => {
  const logs = await prisma.activityLog.findMany({
    where: {
      module,
      recordId,
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return logs;
};
