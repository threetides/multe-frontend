import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createFileRoute } from "@tanstack/react-router"
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

export const Route = createFileRoute("/_authenticated/collection/new/")({
  component: RouteComponent
})

type Emoji = {
  label: string
  value: string
}

const types = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" }
]

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="e.g. Vinyl records" />
      </Field>
      <Field>
        <FieldLabel>Icon</FieldLabel>
        <Combobox items={emojis} limit={50} itemToStringValue={(emoji: Emoji) => emoji.label}>
          <ComboboxInput placeholder="Search any emoji" showClear />
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
      </Field>
      <Field>
        <FieldLabel>Custom fields</FieldLabel>
        <FieldDescription className="text-sm">
          Every item in this collection gets these fields, on top of price, location and date
          bought.
        </FieldDescription>
        <div className="flex gap-4">
          <Input placeholder="e.g. Artist" />
          <Select items={types}>
            <SelectTrigger>
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
          <Button variant="ghost" size="icon" className="border-dashed w-full flex-0 aspect-square">
            <X data-icon="inline-start" />
          </Button>
        </div>
        <Button variant="outline" className="border-dashed w-full">
          <Plus data-icon="inline-start" />
          Add field
        </Button>
      </Field>
      <Button>Create collection</Button>
    </div>
  )
}