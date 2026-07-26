import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import { logActivity } from "./activityLog.service.js";

export const createCustomerService = async (data, userId) => {
  const { code, name, taxId, phone, email, address, status } = data;

  const existingCustomer = await prisma.customer.findFirst({
    where: {
      OR: [{ code }, { taxId }],
    },
  });

  if (existingCustomer) {
    if (existingCustomer.code === code) {
      throw createError(400, "Customer code already exists");
    }

    if (existingCustomer.taxId === taxId) {
      throw createError(400, "Tax ID already exists");
    }
  }

  const customer = await prisma.customer.create({
    data: {
      code,
      name,
      taxId,
      phone: phone || null,
      email: email || null,
      address: address || null,
      status: status || "ACTIVE",
    },
  });

  await logActivity({
    userId,
    action: "CREATE_CUSTOMER",
    module: "customer",
    recordId: customer.id,
    description: `Created customer ${customer.name}`,
  });

  return customer;
};
export const getCustomersService = async () => {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
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
  });

  return customers;
};
export const getCustomerByIdService = async (customerId) => {
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
export const updateCustomerService = async (customerId, data, userId) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw createError(404, "Customer not found");
  }

  if (data.code || data.taxId) {
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        id: {
          not: customerId,
        },
        OR: [
          data.code ? { code: data.code } : undefined,
          data.taxId ? { taxId: data.taxId } : undefined,
        ].filter(Boolean),
      },
    });

    if (existingCustomer) {
      if (existingCustomer.code === data.code) {
        throw createError(400, "Customer code already exists");
      }

      if (existingCustomer.taxId === data.taxId) {
        throw createError(400, "Tax ID already exists");
      }
    }
  }

  const updateData = {};

  if (data.code !== undefined) updateData.code = data.code;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.taxId !== undefined) updateData.taxId = data.taxId;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.email !== undefined) updateData.email = data.email || null;
  if (data.address !== undefined) updateData.address = data.address || null;
  if (data.status !== undefined) updateData.status = data.status;

  const updatedCustomer = await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: updateData,
  });

  await logActivity({
    userId,
    action: "UPDATE_CUSTOMER",
    module: "customer",
    recordId: updatedCustomer.id,
    description: `Updated customer ${updatedCustomer.name}`,
  });

  return updatedCustomer;
};
export const deleteCustomerService = async (customerId, userId) => {
  const id = Number(customerId);

  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    throw createError(404, "Customer not found");
  }

  await prisma.customer.delete({
    where: {
      id,
    },
  });

  await logActivity({
    userId,
    action: "DELETE_CUSTOMER",
    module: "customer",
    recordId: id,
    description: `Deleted customer ${customer.name}`,
  });

  return customer;
};