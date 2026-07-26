import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import { logActivity } from "./activityLog.service.js";

const assignmentInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
    },
  },
};

const ensureCustomerExists = async (customerId) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw createError(404, "Customer not found");
  }
};

export const getAssignmentsByCustomerService = async (customerId) => {
  await ensureCustomerExists(customerId);

  const assignments = await prisma.customerAssignment.findMany({
    where: {
      customerId,
    },
    include: assignmentInclude,
    orderBy: [{ staffRole: "asc" }, { assignedAt: "asc" }],
  });

  return assignments;
};

export const createAssignmentService = async (customerId, data, actingUserId) => {
  const { userId, staffRole = "SECONDARY" } = data;

  await ensureCustomerExists(customerId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw createError(404, "User not found");
  }

  if (!user.isActive) {
    throw createError(400, "Cannot assign an inactive user");
  }

  if (staffRole === "PRIMARY") {
    await prisma.customerAssignment.updateMany({
      where: {
        customerId,
        staffRole: "PRIMARY",
        userId: {
          not: userId,
        },
      },
      data: {
        staffRole: "SECONDARY",
      },
    });
  }

  const assignment = await prisma.customerAssignment.upsert({
    where: {
      customerId_userId: {
        customerId,
        userId,
      },
    },
    update: {
      staffRole,
    },
    create: {
      customerId,
      userId,
      staffRole,
    },
    include: assignmentInclude,
  });

  await logActivity({
    userId: actingUserId,
    action: "ASSIGN_STAFF",
    module: "customer",
    recordId: customerId,
    description: `Assigned ${assignment.user.firstName} ${assignment.user.lastName} as ${staffRole} staff`,
  });

  return assignment;
};

export const updateAssignmentService = async (
  customerId,
  assignmentId,
  data,
  actingUserId
) => {
  const { staffRole } = data;

  const assignment = await prisma.customerAssignment.findUnique({
    where: {
      id: assignmentId,
    },
  });

  if (!assignment || assignment.customerId !== customerId) {
    throw createError(404, "Assignment not found");
  }

  if (staffRole === "PRIMARY") {
    await prisma.customerAssignment.updateMany({
      where: {
        customerId,
        staffRole: "PRIMARY",
        id: {
          not: assignmentId,
        },
      },
      data: {
        staffRole: "SECONDARY",
      },
    });
  }

  const updated = await prisma.customerAssignment.update({
    where: {
      id: assignmentId,
    },
    data: {
      staffRole,
    },
    include: assignmentInclude,
  });

  await logActivity({
    userId: actingUserId,
    action: "UPDATE_ASSIGNMENT",
    module: "customer",
    recordId: customerId,
    description: `Changed ${updated.user.firstName} ${updated.user.lastName} to ${staffRole} staff`,
  });

  return updated;
};

export const deleteAssignmentService = async (customerId, assignmentId, actingUserId) => {
  const assignment = await prisma.customerAssignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: assignmentInclude,
  });

  if (!assignment || assignment.customerId !== customerId) {
    throw createError(404, "Assignment not found");
  }

  await prisma.customerAssignment.delete({
    where: {
      id: assignmentId,
    },
  });

  await logActivity({
    userId: actingUserId,
    action: "UNASSIGN_STAFF",
    module: "customer",
    recordId: customerId,
    description: `Unassigned ${assignment.user.firstName} ${assignment.user.lastName}`,
  });

  return assignment;
};
