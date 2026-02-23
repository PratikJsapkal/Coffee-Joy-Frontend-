import { z } from "zod";

/* =======================
   SIGNUP VALIDATION
======================= */
export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/* =======================
   LOGIN VALIDATION
======================= */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/* =======================
   FORGOT PASSWORD
======================= */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
});