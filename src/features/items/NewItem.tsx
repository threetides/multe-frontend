import { Field, FieldContent, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, type FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { itemSchema, type ItemSchemaType } from "@/features/items/validation"
import useFormPersist from "react-hook-form-persist"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Collection, Response } from "@/shared/types"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { queryClient } from "@/main"

type CollectionField = {
  id: string
  collectionID: string
  key: string
  label: string
  type: "text" | "number"
  unit: string
  position: number
}

type NewItemProps = {
  collectionID: string
}

export const NewItem: FC<NewItemProps> = ({ collectionID }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm<ItemSchemaType>({
    resolver: zodResolver(itemSchema),
    mode: "onTouched"
  })

  useFormPersist("newItem", {
    watch,
    setValue
  })

  useEffect(() => {
    if (errors) console.log(errors)
  }, [errors])

  const navigate = useNavigate()

  const { data: collection } = useQuery({
    queryKey: [`getCollection-${collectionID}`, collectionID],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/collection/${collectionID}`,
        {
          credentials: "include"
        }
      )
      const data: Response<Collection & { collectionFields: CollectionField[] }> = await res.json()
      setValue("collectionID", data.data.id)
      return data.data
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (item: ItemSchemaType) => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/item`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          ...item,
          // Go's time.Time can't parse a plain "YYYY-MM-DD" date input value
          dateBought: item.dateBought ? new Date(item.dateBought).toISOString() : undefined
        })
      })
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: [`getItemsPerCollection-${collectionID}`] })
        await navigate({ to: "/collection/$collectionID", params: { collectionID } })
        sessionStorage.removeItem("newItem")
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

  const onSubmit = (data: ItemSchemaType) => {
    mutate(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="e.g. Dumbells" {...register("name")} maxLength={255} />
        {errors.name && <FieldError className="text-xs">{errors.name.message}</FieldError>}
      </Field>
      <Field>
        <FieldLabel>Status</FieldLabel>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <RadioGroup
              className="flex"
              value={(field.value || null) as unknown as string}
              onValueChange={(value) => field.onChange((value as unknown as string) ?? "")}
              defaultValue="owned"
            >
              <FieldLabel htmlFor="owned">
                <Field orientation="horizontal">
                  <RadioGroupItem value="owned" id="owned" />
                  <FieldContent>
                    <FieldTitle>Owned</FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="wish">
                <Field orientation="horizontal">
                  <RadioGroupItem value="wish" id="wish" />
                  <FieldContent>
                    <FieldTitle>Wishlist</FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            </RadioGroup>
          )}
        />
        {errors.status && <FieldError className="text-xs">{errors.status.message}</FieldError>}
      </Field>
      <Field>
        <FieldLabel>Price</FieldLabel>
        <Input
          type="number"
          min={0}
          step="any"
          placeholder="e.g. 1249"
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value))
          })}
        />
        {errors.price && <FieldError className="text-xs">{errors.price.message}</FieldError>}
      </Field>
      {watch("status") === "owned" && <></>}
      <Separator />
      <h3>{collection?.name} custom fields</h3>
      {collection?.collectionFields.map((collectionField) => (
        <Field key={collectionField.id}>
          <FieldLabel>
            {collectionField.label}
            {collectionField.unit && ` (${collectionField.unit})`}
          </FieldLabel>
          <Input
            type={collectionField.type === "number" ? "number" : "text"}
            step="any"
            maxLength={255}
            {...register(
              `custom.${collectionField.key}`,
              collectionField.type === "number"
                ? { setValueAs: (value) => (value === "" ? "" : Number(value)) }
                : {}
            )}
          />
          {errors.custom?.[collectionField.label] && (
            <FieldError className="text-xs">
              {errors.custom[collectionField.label]?.message}
            </FieldError>
          )}
        </Field>
      ))}
      <Button type="submit" disabled={isPending}>
        {isPending && <Spinner data-icon="inline-start" />}
        Create item
      </Button>
    </form>
  )
}