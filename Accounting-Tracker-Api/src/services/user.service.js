import bcrypt from "bcryptjs";

import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

const safeUserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export const getUsersService = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: safeUserSelect,
  });

  return users;
};

export const getUserByIdService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: safeUserSelect,
  });

  if (!user) {
    throw createError(404, "User not found");
  }

  return user;
};

export const createUserService = async (data) => {
  const { email, password, firstName, lastName, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw createError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || "STAFF",
    },
    select: safeUserSelect,
  });

  return user;
};

export const updateUserService = async (userId, data) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw createError(404, "User not found");
  }

  if (data.email && data.email !== existingUser.email) {
    const emailTaken = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailTaken) {
      throw createError(400, "Email already exists");
    }
  }

  const updateData = {};

  if (data.email !== undefined) updateData.email = data.email;
  if (data.firstName !== undefined) updateData.firstName = data.firstName;
  if (data.lastName !== undefined) updateData.lastName = data.lastName;
  if (data.role !== undefined) updateData.role = data.role;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
    select: safeUserSelect,
  });

  return user;
};

export const deactivateUserService = async (userId, currentUserId) => {
  if (userId === currentUserId) {
    throw createError(400, "You cannot deactivate your own account");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw createError(404, "User not found");
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: false,
    },
    select: safeUserSelect,
  });

  return user;
};
