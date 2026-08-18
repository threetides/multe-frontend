import { Link } from "@tanstack/react-router"
import { Bookmark, Boxes } from "lucide-react"
import type { FC } from "react"

export const BottombarMobile: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-sidebar flex">
      <Link
        to="/"
        className="flex flex-col flex-1 justify-center items-center text-muted-foreground data-[status=active]:text-primary-foreground"
      >
        <Boxes />
        <p className="text-sm">Collections</p>
      </Link>
      <Link
        to="/wishlist"
        className="flex flex-col flex-1 justify-center items-center text-muted-foreground data-[status=active]:text-primary-foreground"
      >
        <Bookmark />
        <p className="text-sm">Wishlist</p>
      </Link>
    </div>
  )
}