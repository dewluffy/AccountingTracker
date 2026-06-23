import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),

    password: z
      .string()
      .min(1, "Password is required"),
  }),
});

export const createCustomerSchema = z.object({
  body: z.object({
    code: z.string().trim().min(1, "Customer code is required"),

    name: z.string().trim().min(1, "Customer name is required"),

    taxId: z.string().trim().min(1, "Tax ID is required"),

    phone: z.string().trim().optional(),

    email: z
      .string()
      .trim()
      .email("Invalid email format")
      .optional()
      .or(z.literal("")),

    address: z.string().trim().optional(),

    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  }),
});
export const getCustomerByIdSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),
});
export const updateCustomerSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  body: z.object({
    code: z.string().trim().min(1, "Customer code is required").optional(),

    name: z.string().trim().min(1, "Customer name is required").optional(),

    taxId: z.string().trim().min(1, "Tax ID is required").optional(),

    phone: z.string().trim().optional(),

    email: z
      .string()
      .trim()
      .email("Invalid email format")
      .optional()
      .or(z.literal("")),

    address: z.string().trim().optional(),

    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  }),
});