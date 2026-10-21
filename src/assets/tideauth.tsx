import type { FC, SVGProps } from "react"

export const Tideauth: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" {...props}>
      <rect x="9.5" y="7.5" width="29" height="4" fill="#BD91D3" />
      <rect x="22" y="9.5" width="4" height="29" fill="#BD91D3" />
      <g fill="#A275B0" fillOpacity="0.6">
        <circle cx="9.5" cy="24" r="3.5" />
        <circle cx="38.5" cy="24" r="3.5" />
        <circle cx="9.5" cy="38.5" r="3.5" />
        <circle cx="38.5" cy="38.5" r="3.5" />
      </g>
      <circle cx="9.5" cy="9.5" r="5.5" fill="#D1ADEC" />
      <circle cx="24" cy="9.5" r="5.5" fill="#A275B0" />
      <circle cx="38.5" cy="9.5" r="5.5" fill="#D1ADEC" />
      <circle cx="24" cy="24" r="5.5" fill="#DFCAF7" />
      <circle cx="24" cy="38.5" r="5.5" fill="#EFE7FC" />
    </svg>
  )
}
