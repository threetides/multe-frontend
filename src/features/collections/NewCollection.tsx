import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import emojis from "@/assets/emojis.json"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { type FC } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { collectionSchema, type CollectionSchemaType } from "@/features/collections/validation"
import useFormPersist from "react-hook-form-persist"
import { useMutation } from "@tanstack/react-query"
import type { Response } from "@/shared/types"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "@/components/ui/toast"

type Emoji = {
  label: string
  value: string
}

const types = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" }
]

export const NewCollection: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm<CollectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    mode: "onTouched"
  })

  useFormPersist("newCollection", {
    watch,
    setValue
  })

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: async (col: CollectionSchemaType) => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collection`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(col)
      })
      const data: Response<string> = await res.json()
      if (res.status === 201) {
        await navigate({ to: "/collection/$collectionID", params: { collectionID: data.data } })
        sessionStorage.removeItem("newCollection")
      }
    },
    onError: (error) => {
      toast.add({
        title: "An error occured",
        description: error.message,
        type: "error"
      })
    }
  })

  const onSubmit = (data: CollectionSchemaType) => {
    mutate(data)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "collectionFields"
  })

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="e.g. Vinyl records" {...register("name")} maxLength={255} />
        {errors.name && <FieldError>{errors.name.message}</FieldError>}
      </Field>
      <Field>
        <FieldLabel>Icon</FieldLabel>
        <Controller
          control={control}
          name="emoji"
          render={({ field }) => (
            <Combobox
              items={emojis}
              limit={50}
              itemToStringValue={(emoji: Emoji) => emoji.label}
              value={(field.value || null) as unknown as Emoji}
              onValueChange={(value) => field.onChange((value as unknown as string) ?? "")}
            >
              <ComboboxInput
                placeholder="Search any emoji"
                showClear
                onBlur={field.onBlur}
                maxLength={255}
              />
              <ComboboxContent>
                <ComboboxEmpty>No emojis found.</ComboboxEmpty>
                <ComboboxList>
                  {(emoji: Emoji) => (
                    <ComboboxItem key={emoji.value} value={emoji.value}>
                      {emoji.value}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        />
        {errors.emoji && <FieldError>{errors.emoji.message}</FieldError>}
      </Field>
      <Field>
        <FieldLabel>Custom fields</FieldLabel>
        <FieldDescription className="text-sm">
          Every item in this collection gets these fields, on top of price, location and date
          bought.
        </FieldDescription>
        {fields.map((field, index) => {
          return (
            <div className="flex flex-col gap-2" key={field.id}>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Artist"
                  maxLength={255}
                  {...register(`collectionFields.${index}.label` as const)}
                />
                <Controller
                  control={control}
                  name={`collectionFields.${index}.type` as const}
                  render={({ field: typeField }) => (
                    <Select
                      items={types}
                      value={typeField.value}
                      onValueChange={typeField.onChange}
                    >
                      <SelectTrigger onBlur={typeField.onBlur}>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {types.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full flex-0 aspect-square"
                  onClick={() => remove(index)}
                >
                  <X data-icon="inline-start" />
                </Button>
              </div>
              {errors.collectionFields?.[index]?.label && (
                <FieldError>{errors.collectionFields?.[index]?.label.message}</FieldError>
              )}
            </div>
          )
        })}

        <Button
          variant="outline"
          className="border-dashed w-full"
          onClick={() => append({ label: "", type: "text" })}
        >
          <Plus data-icon="inline-start" />
          Add field
        </Button>
      </Field>
      <Button type="submit" disabled={isPending}>
        {isPending && <Spinner data-icon="inline-start" />}
        Create collection
      </Button>
    </form>
  )
}