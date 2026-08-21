import z from "zod"

export const settingsSchema = z.object({
  currency: z
    .string("Currency is required")
    .trim()
    .nonempty("Currency is required")
    .max(255, "Currency must be 255 characters or fewer")
})

export type SettingsSchemaType = z.infer<typeof settingsSchema>