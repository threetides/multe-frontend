import { type FC } from "react"
import logodark from "@/assets/logo-dark.svg"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox"
import currencies from "@/assets/currencies.json"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { settingsSchema, type SettingsSchemaType } from "@/features/navigation/validation"
import { Separator } from "@/components/ui/separator"
import { useMutation } from "@tanstack/react-query"
import type { Response } from "@/shared/types"
import { toast } from "sonner"

type Currency = {
  label: string
  value: string
  symbol: string
}

export const TopbarMobile: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    mode: "onTouched"
  })

  const onSubmit = (data: SettingsSchemaType) => {
    console.log(data)
  }

  const navigate = useNavigate()

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-out`, {
        method: "POST",
        credentials: "include"
      })
      const data: Response<unknown> = await response.json()
      if (!response.ok) throw new Error(data.message || "Failed to sign out")
    },
    onError: (error) => {
      toast.error("An error occured", {
        id: "signOutError",
        description: error.message,
        position: "top-center"
      })
    },
    onSuccess: () => {
      navigate({ to: "/sign-in" })
      toast.success("Signed out", {
        id: "signedOut",
        position: "top-center"
      })
    }
  })

  return (
    <nav className="p-4 flex flex-col gap-2 items-start">
      <div className="flex items-center justify-between w-full">
        <Link to="/">
          <img src={logodark} alt="Multe logo" className="h-10" />
        </Link>
        <Drawer>
          <DrawerTrigger
            render={
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings />
              </Button>
            }
          />
          <DrawerContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <Controller
                    control={control}
                    name="currency"
                    render={({ field }) => (
                      <Combobox
                        items={currencies}
                        limit={50}
                        itemToStringValue={(currency: Currency) => currency.label}
                        value={(field.value || null) as unknown as Currency}
                        onValueChange={(value) =>
                          field.onChange((value as unknown as string) ?? "")
                        }
                      >
                        <ComboboxInput
                          placeholder="Search any currency"
                          showClear
                          onBlur={field.onBlur}
                          maxLength={255}
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No currencies found.</ComboboxEmpty>
                          <ComboboxList>
                            {(currency: Currency) => (
                              <ComboboxItem key={currency.value} value={currency.symbol}>
                                {currency.symbol} - {currency.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    )}
                  />
                  {errors.currency && <FieldError>{errors.currency.message}</FieldError>}
                </Field>
              </div>
              <DrawerFooter className="gap-4">
                <div className="flex flex-col gap-2">
                  <Button type="submit">Save</Button>
                  <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
                </div>
                <Separator />
                <Button variant="outline" onClick={() => signOutMutation.mutate()}>
                  Sign out
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  )
}