
import { z } from "zod";

// ZOD: Validates registration data.
export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email is too long."),

  password: z
    .string()
    .min(8, "Password must have at least 8 characters.")
    .max(72, "Password is too long."),
});

// ZOD: Validates login data.
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email is too long."),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(72, "Password is too long."),
});
