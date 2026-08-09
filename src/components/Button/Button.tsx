import { type ComponentProps } from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import "./Button.css"

type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: "solid" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = ({ variant = "solid", size = "md", className, ...props }: ButtonProps) => {
  const classes = `button button--${variant} button--${size}`
  return <BaseButton {...props} className={className ? `${classes} ${className}` : classes} />
}