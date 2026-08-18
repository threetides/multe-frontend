import z from "zod"

export const itemSchema = z.object({
  collectionID: z.uuid("Collection id is required"),
  name: z
    .string("Name is required")
    .trim()
    .nonempty("Name is required")
    .max(255, "Name must be 255 characters or fewer"),
  status: z.enum(["owned", "wish"], "Select a status"),
  price: z
    .number("Price must be a number")
    .nonnegative("Price must be a positive number")
    .optional(),
  dateBought: z.iso.date("Enter a valid date").optional(),
  location: z.string().trim().max(255, "Location must be 255 characters or fewer").optional(),
  custom: z.record(z.string(), z.union([z.string(), z.number()]))
})

export type ItemSchemaType = z.infer<typeof itemSchema>