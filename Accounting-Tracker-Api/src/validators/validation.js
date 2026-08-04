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

const MONTHLY_TAX_TYPES = [
  "VAT_PP30",
  "VAT_PP36",
  "WHT_PND1",
  "WHT_PND3",
  "WHT_PND53",
  "WHT_PND54",
  "SBT_PT40",
  "SSO",
];

const MONTHLY_TAX_STATUSES = [
  "NOT_STARTED",
  "WAITING_DOCS",
  "IN_PROGRESS",
  "WAITING_PAYMENT",
  "COMPLETED",
];

export const monthlyTaxQuerySchema = z.object({
  query: z.object({
    year: z.coerce.number().int().min(2000).max(2100),
    month: z.coerce.number().int().min(1).max(12),
  }),
});

export const monthlyTaxCustomerQuerySchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  query: z.object({
    year: z.coerce.number().int().min(2000).max(2100),
    month: z.coerce.number().int().min(1).max(12),
  }),
});

export const updateMonthlyTaxSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  query: z.object({
    year: z.coerce.number().int().min(2000).max(2100),
    month: z.coerce.number().int().min(1).max(12),
  }),

  body: z.object({
    items: z
      .array(
        z.object({
          taxType: z.enum(MONTHLY_TAX_TYPES),
          status: z.enum(MONTHLY_TAX_STATUSES),
          submittedAt: z.string().trim().optional().nullable(),
          remark: z.string().trim().optional().nullable(),
        })
      )
      .min(1, "At least one tax item is required"),
  }),
});

export const createAssignmentSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  body: z.object({
    userId: z.coerce
      .number()
      .int("User ID must be an integer")
      .positive("User ID must be a positive number"),

    staffRole: z.enum(["PRIMARY", "SECONDARY"]).optional(),
  }),
});

export const assignmentParamsSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),

    assignmentId: z.coerce
      .number()
      .int("Assignment ID must be an integer")
      .positive("Assignment ID must be a positive number"),
  }),
});

export const updateAssignmentSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),

    assignmentId: z.coerce
      .number()
      .int("Assignment ID must be an integer")
      .positive("Assignment ID must be a positive number"),
  }),

  body: z.object({
    staffRole: z.enum(["PRIMARY", "SECONDARY"]),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    firstName: z.string().trim().min(1, "First name is required"),

    lastName: z.string().trim().min(1, "Last name is required"),

    role: z.enum(["ADMIN", "MANAGER", "STAFF"]).optional(),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number()
      .int("User ID must be an integer")
      .positive("User ID must be a positive number"),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number()
      .int("User ID must be an integer")
      .positive("User ID must be a positive number"),
  }),

  body: z.object({
    email: z
      .string()
      .trim()
      .email("Invalid email format")
      .optional(),

    firstName: z.string().trim().min(1, "First name is required").optional(),

    lastName: z.string().trim().min(1, "Last name is required").optional(),

    role: z.enum(["ADMIN", "MANAGER", "STAFF"]).optional(),

    isActive: z.boolean().optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
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

const ANNUAL_TAX_TYPES = ["PND50", "PND51", "FINANCIAL_STATEMENT"];

const ANNUAL_TAX_STATUSES = [
  "NOT_STARTED",
  "WAITING_DOCS",
  "IN_PROGRESS",
  "WAITING_PAYMENT",
  "COMPLETED",
];

export const annualTaxQuerySchema = z.object({
  query: z.object({
    year: z.coerce.number().int().min(2000).max(2100),
  }),
});

export const annualTaxCustomerQuerySchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  query: z.object({
    year: z.coerce.number().int().min(2000).max(2100),
  }),
});

export const updateAnnualTaxSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  query: z.object({
    year: z.coerce.number().int().min(2000).max(2100),
  }),

  body: z.object({
    items: z
      .array(
        z.object({
          taxType: z.enum(ANNUAL_TAX_TYPES),
          status: z.enum(ANNUAL_TAX_STATUSES),
          submittedAt: z.string().trim().optional().nullable(),
          remark: z.string().trim().optional().nullable(),
        })
      )
      .min(1, "At least one tax item is required"),
  }),
});

const WORK_STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED", "WAITING"];

const workSectionSchema = z.object({
  month: z.coerce.number().int().min(1).max(12).optional().nullable(),
  year: z.coerce.number().int().min(2000).max(2100).optional().nullable(),
  status: z.enum(WORK_STATUSES),
  remark: z.string().trim().optional().nullable(),
});

export const workCustomerParamsSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),
});

export const updateWorkSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  body: z.object({
    expense: workSectionSchema,
    income: workSectionSchema,
    bank: workSectionSchema,
  }),
});

export const createContactSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  body: z.object({
    name: z.string().trim().min(1, "Contact name is required"),
    position: z.string().trim().optional().nullable(),
    phone: z.string().trim().optional().nullable(),
    email: z
      .string()
      .trim()
      .email("Invalid email format")
      .optional()
      .nullable()
      .or(z.literal("")),
  }),
});

export const contactParamsSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),

    contactId: z.coerce
      .number()
      .int("Contact ID must be an integer")
      .positive("Contact ID must be a positive number"),
  }),
});

export const updateContactSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),

    contactId: z.coerce
      .number()
      .int("Contact ID must be an integer")
      .positive("Contact ID must be a positive number"),
  }),

  body: z.object({
    name: z.string().trim().min(1, "Contact name is required").optional(),
    position: z.string().trim().optional().nullable(),
    phone: z.string().trim().optional().nullable(),
    email: z
      .string()
      .trim()
      .email("Invalid email format")
      .optional()
      .nullable()
      .or(z.literal("")),
  }),
});

export const uploadDocumentSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),
  }),

  body: z.object({
    documentType: z.enum(["TAX", "FINANCIAL", "CONTRACT", "OTHER"]),
  }),
});

export const documentParamsSchema = z.object({
  params: z.object({
    customerId: z.coerce
      .number()
      .int("Customer ID must be an integer")
      .positive("Customer ID must be a positive number"),

    documentId: z.coerce
      .number()
      .int("Document ID must be an integer")
      .positive("Document ID must be a positive number"),
  }),
});