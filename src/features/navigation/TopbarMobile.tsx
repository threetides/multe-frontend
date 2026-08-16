import { useState, type FC } from "react"
import logodark from "@/assets/logo-dark.svg"
import { useQuery } from "@tanstack/react-query"
import type { Item, Response } from "@/shared/types"
import { Dot } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export const TopbarMobile: FC = () => {
  const [itemsOwned, setItemsOwned] = useState<number>(0)
  const [valueOwned, setValueOwned] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      setLoading(true)
      setItemsOwned(0)
      setValueOwned(0)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
        credentials: "include"
      })
      const data: Response<Item[]> = await res.json()

      for (const item of data.data) {
        if (item.status === "owned") setItemsOwned((prev) => prev + 1)
        if (item.status === "owned") setValueOwned((prev) => prev + item.price)
      }

      setLoading(false)
      return data
    }
  })

  return (
    <nav className="p-4 flex flex-col gap-2 items-start">
      <img src={logodark} alt="Multe logo" className="h-10" />
      {loading ? (
        <Skeleton className="h-4 w-40" />
      ) : (
        <div className="flex text-sm text-muted-foreground">
          <p>{itemsOwned} owned</p>
          <Dot className="text-accent-foreground" />
          <p>{valueOwned} kr owned</p>
        </div>
      )}
    </nav>
  )
}