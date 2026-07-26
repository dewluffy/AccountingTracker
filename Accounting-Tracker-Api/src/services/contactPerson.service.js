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
};

export const getContactsByCustomerService = async (customerId) => {
  await ensureCustomerExists(customerId);

  const contacts = await prisma.contactPerson.findMany({
    where: {
      customerId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return contacts;
};

export const createContactService = async (customerId, data, actingUserId) => {
  await ensureCustomerExists(customerId);

  const contact = await prisma.contactPerson.create({
    data: {
      customerId,
      name: data.name,
      position: data.position || null,
      phone: data.phone || null,
      email: data.email || null,
    },
  });

  await logActivity({
    userId: actingUserId,
    action: "ADD_CONTACT",
    module: "customer",
    recordId: customerId,
    description: `Added contact person ${contact.name}`,
  });

  return contact;
};

export const updateContactService = async (
  customerId,
  contactId,
  data,
  actingUserId
) => {
  const contact = await prisma.contactPerson.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact || contact.customerId !== customerId) {
    throw createError(404, "Contact not found");
  }

  const updateData = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.position !== undefined) updateData.position = data.position || null;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.email !== undefined) updateData.email = data.email || null;

  const updated = await prisma.contactPerson.update({
    where: {
      id: contactId,
    },
    data: updateData,
  });

  await logActivity({
    userId: actingUserId,
    action: "UPDATE_CONTACT",
    module: "customer",
    recordId: customerId,
    description: `Updated contact person ${updated.name}`,
  });

  return updated;
};

export const deleteContactService = async (customerId, contactId, actingUserId) => {
  const contact = await prisma.contactPerson.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact || contact.customerId !== customerId) {
    throw createError(404, "Contact not found");
  }

  await prisma.contactPerson.delete({
    where: {
      id: contactId,
    },
  });

  await logActivity({
    userId: actingUserId,
    action: "DELETE_CONTACT",
    module: "customer",
    recordId: customerId,
    description: `Deleted contact person ${contact.name}`,
  });

  return contact;
};
