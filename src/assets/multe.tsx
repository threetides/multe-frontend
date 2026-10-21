import type { FC, SVGProps } from "react"

export const Multe: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" {...props}>
      <rect x="4" y="4" width="18.5" height="18.5" rx="6" fill="#EAD19C" />
      <rect x="25.5" y="4" width="18.5" height="18.5" rx="6" fill="#E4B56D" />
      <rect x="4" y="25.5" width="18.5" height="18.5" rx="6" fill="#BF752F" />
      <rect x="25.5" y="25.5" width="18.5" height="18.5" rx="6" fill="#F2EBD1" />
    </svg>
  )
}
