import { CollectionList } from "@/features/collections/CollectionList"
import type { Collection, Item as ItemType, Response } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent
})

function RouteComponent() {
  const { isPending, data } = useQuery({
    queryKey: ["getCollectionsAndItems"],
    queryFn: async () => {
      const collectionRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections`, {
        credentials: "include"
      })
      const collections: Response<Collection[]> = await collectionRes.json()

      const itemRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
        credentials: "include"
      })
      const items: Response<ItemType[]> = await itemRes.json()
      return { collections, items }
    }
  })

  if (!isPending)
    return (
      <div className="flex flex-col gap-2">
        {data?.collections.data && data.items.data && (
          <CollectionList collections={data?.collections.data} items={data?.items.data} />
        )}
      </div>
    )
}