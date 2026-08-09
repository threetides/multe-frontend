import { Dialog as BaseDialog } from "@base-ui/react"
import type { ComponentProps, ReactNode } from "react"

// your own object — safe to mutate
const Root = ({ children, ...props }: ComponentProps<typeof BaseDialog.Root>) => {
  return (
    <BaseDialog.Root {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop />
        <BaseDialog.Viewport>{children as ReactNode}</BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export const Animate = Object.assign(Root, {
  Popup: BaseDialog.Popup
})