import z from "zod"

export const signInSchema = z.object({
  email: z.string("Email is required").trim().nonempty("Email is required"),
  password: z.string("Password is required").trim().nonempty("Password is required")
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  email: z
    .string("Email is required")
    .trim()
    .nonempty("Email is required")
    .email("Email is invalid"),
  name: z
    .string("Name is required")
    .trim()
    .nonempty("Name is required")
    .max(255, "Name can't contain more than 255 characters"),
  password: z
    .string("Password is required")
    .trim()
    .nonempty("Password is required")
    .min(8, "Password must contain at least 8 characters")
    .max(128, "Password can't contain more than 128 characters")
    .regex(/\p{Ll}/u, "Password must contain at least one lowercase letter")
    .regex(/\p{Lu}/u, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
})

export type SignUpSchema = z.infer<typeof signUpSchema>