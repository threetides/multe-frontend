import z from "zod"

export const collectionSchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .nonempty("Name is required")
    .max(255, "Name must be 255 characters or fewer"),
  emoji: z
    .string("Emoji is required")
    .trim()
    .nonempty("Emoji is required")
    .max(255, "Emoji must be 255 characters or fewer"),
  collectionFields: z
    .object({
      label: z
        .string("Label is required")
        .trim()
        .nonempty("Label is required")
        .max(255, "Label must be 255 characters or fewer"),
      type: z.enum(["text", "number"], "Select a type")
    })
    .array()
})

export type CollectionSchemaType = z.infer<typeof collectionSchema>