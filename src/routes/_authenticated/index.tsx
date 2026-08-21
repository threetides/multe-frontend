import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import { CollectionList } from "@/features/collections/CollectionList"
import type { Collection, Response } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent
})

function RouteComponent() {
  const { data, isPending } = useQuery({
    queryKey: ["getCollectionsAndItemsHomepage"],
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
              if (item.price) priceOwned = priceOwned + item.price
            } else if (item.status === "wish") {
              itemsWishlisted = itemsWishlisted + 1
              if (item.price) priceWishlisted = priceWishlisted + item.price
            }
          }
        }
      }

      return { collections, itemsOwned, priceOwned, itemsWishlisted, priceWishlisted }
    }
  })

  if (isPending)
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="flex-1">
            <Item variant="outline" className="opacity-0">
              <ItemContent className="gap-0">
                <ItemTitle className="text-muted-foreground">Owned</ItemTitle>
                <ItemDescription className="text-foreground text-lg">0 kr</ItemDescription>
                <ItemDescription className="text-xs">0 items</ItemDescription>
              </ItemContent>
            </Item>
          </Skeleton>
          <Skeleton className="flex-1">
            <Item variant="outline" className="bg-primary/5 border-primary/20 opacity-0">
              <ItemContent className="gap-0">
                <ItemTitle className="text-primary">Wishlisted</ItemTitle>
                <ItemDescription className="text-foreground text-lg">0 kr</ItemDescription>
                <ItemDescription className="text-xs text-primary">0 items</ItemDescription>
              </ItemContent>
            </Item>
          </Skeleton>
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index}>
              <Link to="/" disabled className="opacity-0">
                <Item variant="outline" className="gap-4 h-full">
                  <ItemMedia className="bg-muted text-3xl aspect-square size-12 rounded-sm self-center!">
                    😎
                  </ItemMedia>
                  <ItemContent className="flex-col">
                    <ItemTitle>Name</ItemTitle>
                    <ItemDescription className="flex text-xs items-center">
                      Description
                    </ItemDescription>
                    <ItemDescription className="flex text-xs items-center text-primary-foreground">
                      Description
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </Link>
            </Skeleton>
          ))}
          <Skeleton>
            <Link to="/collection/new" disabled className="opacity-0">
              <Button
                variant="outline"
                className="border-dashed w-full h-full bg-transparent! pt-2 pb-2"
              >
                <CirclePlus data-icon="inline-start" />
                New collection
              </Button>
            </Link>
          </Skeleton>
        </div>
      </div>
    )

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