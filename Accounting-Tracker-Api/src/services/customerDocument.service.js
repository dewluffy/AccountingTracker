import fs from "fs";
import path from "path";

import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import { logActivity } from "./activityLog.service.js";
import { UPLOADS_ROOT } from "../middlewares/upload.middleware.js";

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

export const getDocumentsByCustomerService = async (customerId) => {
  await ensureCustomerExists(customerId);

  const documents = await prisma.customerDocument.findMany({
    where: {
      customerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return documents;
};

export const createDocumentService = async (
  customerId,
  file,
  documentType,
  actingUserId
) => {
  await ensureCustomerExists(customerId);

  if (!file) {
    throw createError(400, "File is required");
  }

  const document = await prisma.customerDocument.create({
    data: {
      customerId,
      fileName: file.originalname,
      fileUrl: `${customerId}/${file.filename}`,
      documentType,
      fileSize: file.size,
    },
  });

  await logActivity({
    userId: actingUserId,
    action: "ADD_DOCUMENT",
    module: "customer",
    recordId: customerId,
    description: `Uploaded document ${document.fileName}`,
  });

  return document;
};

export const getDocumentForDownloadService = async (customerId, documentId) => {
  const document = await prisma.customerDocument.findUnique({
    where: {
      id: documentId,
    },
  });

  if (!document || document.customerId !== customerId) {
    throw createError(404, "Document not found");
  }

  const absolutePath = path.join(UPLOADS_ROOT, document.fileUrl);

  if (!fs.existsSync(absolutePath)) {
    throw createError(404, "File not found on disk");
  }

  return { document, absolutePath };
};

export const deleteDocumentService = async (
  customerId,
  documentId,
  actingUserId
) => {
  const document = await prisma.customerDocument.findUnique({
    where: {
      id: documentId,
    },
  });

  if (!document || document.customerId !== customerId) {
    throw createError(404, "Document not found");
  }

  await prisma.customerDocument.delete({
    where: {
      id: documentId,
    },
  });

  const absolutePath = path.join(UPLOADS_ROOT, document.fileUrl);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }

  await logActivity({
    userId: actingUserId,
    action: "DELETE_DOCUMENT",
    module: "customer",
    recordId: customerId,
    description: `Deleted document ${document.fileName}`,
  });

  return document;
};
