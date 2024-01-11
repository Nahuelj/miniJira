import { z } from "zod";

export const UserValidation = z.object({
  username: z.string().refine((value) => value.trim() !== "", {
    message: "Username is required",
  }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value), {
      message: "Password must contain at least one letter and one number",
    }),
});
