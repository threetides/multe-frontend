import { Button } from "@/components/ui/button"
import type { Item, Response } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/_authenticated/collection/$collectionID/")({
  component: RouteComponent
})

function RouteComponent() {
  const [itemsOwned, setItemsOwned] = useState<number>(0)
  const [valueOwned, setValueOwned] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  console.log(itemsOwned, valueOwned, loading)

  const { collectionID } = Route.useParams()

  useQuery({
    queryKey: ["getItemsPerCollection"],
    queryFn: async () => {
      setLoading(true)
      setItemsOwned(0)
      setValueOwned(0)
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/collection/${collectionID}`,
        {
          credentials: "include"
        }
      )
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
    <div>
      <Link to={"/collection/$collectionID/new"} params={{ collectionID: collectionID }}>
        <Button variant="outline" className="border-dashed w-full h-full bg-transparent!">
          <CirclePlus data-icon="inline-start" />
          New item
        </Button>
      </Link>
    </div>
  )
}