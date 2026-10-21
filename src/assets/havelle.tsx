import type { FC, SVGProps } from "react"

export const Havelle: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" {...props}>
      <defs>
        <mask id="havelle-wave" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#fff" />
          <path
            d="M-2 24 C4 20.5 10 20.5 16 24 S28 27.5 34 24 S46 20.5 52 24"
            fill="none"
            stroke="#000"
            strokeWidth="3"
          />
        </mask>
      </defs>
      <g mask="url(#havelle-wave)" strokeWidth="6" strokeLinejoin="round">
        <polygon points="7.5,7 12.5,9 12.5,39 7.5,41" fill="#838A92" stroke="#838A92" />
        <polygon points="21.5,10 26.5,12 26.5,36 21.5,38" fill="#F6A3B1" stroke="#F6A3B1" />
        <polygon points="35.5,13 40.5,15 40.5,33 35.5,35" fill="#FCC3CA" stroke="#FCC3CA" />
      </g>
    </svg>
  )
}
