import type { FC, SVGProps } from "react"

export const Mail: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg height="72" viewBox="0 0 72 72" width="72" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <mask id="mail-envelope" maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="72">
          <rect width="72" height="72" fill="#fff" />
          <rect x="10" y="17" width="52" height="38" rx="5" fill="#000" />
          <path
            d="M4 12.4 L36 37 L68 12.4"
            fill="none"
            stroke="#fff"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      <rect width="72" height="72" rx="8" fill="currentcolor" mask="url(#mail-envelope)" />
    </svg>
  )
}
