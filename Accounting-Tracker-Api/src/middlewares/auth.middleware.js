import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw createError(401, "User not found");
    }

    if (!user.isActive) {
      throw createError(403, "User account is inactive");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Token expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid token"));
    }

    next(error);
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(createError(403, "Forbidden: insufficient permissions"));
    }

    next();
  };
};