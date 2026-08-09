import { type ComponentProps } from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import "./Accordion.css"

// your own object — safe to mutate
const Root = ({
  className,
  ...props
}: Omit<ComponentProps<typeof BaseAccordion.Root>, "loopFocus">) => {
  return (
    <BaseAccordion.Root {...props} className={className ? `accordion ${className}` : "accordion"} />
  )
}

const Item = ({ className, ...props }: ComponentProps<typeof BaseAccordion.Item>) => {
  return (
    <BaseAccordion.Item
      {...props}
      className={className ? `accordion__item ${className}` : "accordion__item"}
    />
  )
}

const Trigger = ({ className, ...props }: ComponentProps<typeof BaseAccordion.Trigger>) => {
  return (
    <BaseAccordion.Header>
      <BaseAccordion.Trigger
        {...props}
        className={className ? `accordion__trigger ${className}` : "accordion__trigger"}
      />
    </BaseAccordion.Header>
  )
}

const Panel = ({ className, children, ...props }: ComponentProps<typeof BaseAccordion.Panel>) => {
  return (
    <BaseAccordion.Panel
      {...props}
      className={className ? `accordion__panel ${className}` : "accordion__panel"}
    >
      <div className="accordion__panel-content">{children}</div>
    </BaseAccordion.Panel>
  )
}

export const Accordion = Object.assign(Root, {
  Item: Item,
  Trigger: Trigger,
  Panel: Panel
})