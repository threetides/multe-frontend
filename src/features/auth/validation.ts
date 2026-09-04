import z from "zod"

export const signInSchema = z.object({
  email: z.string("Email is required").trim().nonempty("Email is required"),
  password: z.string("Password is required").trim().nonempty("Password is required")
})

export type SignInSchema = z.infer<typeof signInSchema>