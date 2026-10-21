import type { FC, SVGProps } from "react"

export const Threetides: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" {...props}>
      <defs>
        <clipPath id="threetides-shape">
          <rect x="4" y="4" width="40" height="40" rx="6" />
        </clipPath>
        <mask id="threetides-waves" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#fff" />
          <g fill="none" stroke="#000" strokeWidth="3">
            <path d="M-2 17 C4 13.5 10 13.5 16 17 S28 20.5 34 17 S46 13.5 52 17" />
            <path d="M-2 31 C4 27.5 10 27.5 16 31 S28 34.5 34 31 S46 27.5 52 31" />
          </g>
        </mask>
      </defs>
      <g clipPath="url(#threetides-shape)" mask="url(#threetides-waves)">
        <rect x="4" y="4" width="40" height="40" fill="#5B8DC4" />
        <path
          d="M-2 31 C4 27.5 10 27.5 16 31 S28 34.5 34 31 S46 27.5 52 31 V-2 H-2 Z"
          fill="#88C5F7"
        />
        <path
          d="M-2 17 C4 13.5 10 13.5 16 17 S28 20.5 34 17 S46 13.5 52 17 V-2 H-2 Z"
          fill="#B0DBF9"
        />
      </g>
    </svg>
  )
}
