import type { FC, SVGProps } from "react"

export const Gonet: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" {...props}>
      <rect x="18" y="9" width="12" height="4" fill="#42B6C9" />
      <rect x="18" y="35" width="12" height="4" fill="#42B6C9" />
      <rect x="9" y="18" width="4" height="12" fill="#42B6C9" />
      <rect x="35" y="18" width="4" height="12" fill="#42B6C9" />
      <rect x="4" y="4" width="14" height="14" rx="3" fill="#A1E1E7" />
      <rect x="30" y="4" width="14" height="14" rx="3" fill="#6CCFDC" />
      <rect x="4" y="30" width="14" height="14" rx="3" fill="#2998AE" />
      <rect x="30" y="30" width="14" height="14" rx="3" fill="#D5F2F3" />
    </svg>
  )
}
