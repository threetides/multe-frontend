import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { CollectionList } from "@/features/collections/CollectionList"
import type { Collection, Response } from "@/shared/types"
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

      let itemsOwned = 0
      let priceOwned = 0
      let itemsWishlisted = 0
      let priceWishlisted = 0

      for (const collection of collections.data) {
        if (collection.items) {
          for (const item of collection.items) {
            if (item.status === "owned") {
              itemsOwned = itemsOwned + 1
              priceOwned = priceOwned + item.price
            } else if (item.status === "wish") {
              itemsWishlisted = itemsWishlisted + 1
              priceWishlisted = priceWishlisted + item.price
            }
          }
        }
      }

      return { collections, itemsOwned, priceOwned, itemsWishlisted, priceWishlisted }
    }
  })

  if (!isPending)
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Item variant="outline">
            <ItemContent className="gap-0">
              <ItemTitle className="text-muted-foreground">Owned</ItemTitle>
              <ItemDescription className="text-foreground text-lg">
                {data?.priceOwned} kr
              </ItemDescription>
              <ItemDescription className="text-xs">{data?.itemsOwned} items</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" className="bg-primary/5 border-primary/20">
            <ItemContent className="gap-0">
              <ItemTitle className="text-primary">Wishlisted</ItemTitle>
              <ItemDescription className="text-foreground text-lg">
                ~{data?.priceWishlisted} kr
              </ItemDescription>
              <ItemDescription className="text-xs text-primary">
                {data?.itemsWishlisted} items
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>
        {data?.collections.data && <CollectionList collections={data?.collections.data} />}
      </div>
    )
}