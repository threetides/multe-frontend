import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import type { Collection, Item as ItemType, Response } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Dot } from "lucide-react"

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
        {data?.collections.data.map((collection) => {
          return (
            <Item variant="outline" key={collection.id}>
              <ItemMedia className="radius-md bg-muted text-3xl aspect-square size-12 rounded-sm">
                {collection.emoji}
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{collection.name}</ItemTitle>
                <ItemDescription className="flex">
                  {
                    data.items.data.filter((item) => {
                      return item.collectionID === collection.id && item.status === "owned"
                    }).length
                  }{" "}
                  owned
                  <Dot />
                  {
                    data.items.data.filter((item) => {
                      return item.collectionID === collection.id && item.status === "wish"
                    }).length
                  }{" "}
                  wishlisted
                </ItemDescription>
              </ItemContent>
            </Item>
          )
        })}
      </div>
    )
}