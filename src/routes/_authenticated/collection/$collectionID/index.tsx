import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import type { Collection, Response } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/_authenticated/collection/$collectionID/")({
  component: RouteComponent
})

function RouteComponent() {
  const [loading, setLoading] = useState<boolean>(true)

  const { collectionID } = Route.useParams()

  const { data } = useQuery({
    queryKey: ["getItemsPerCollection"],
    queryFn: async () => {
      setLoading(true)

      let itemsOwned = 0
      let priceOwned = 0
      let itemsWishlisted = 0
      let priceWishlisted = 0

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/collection/${collectionID}`,
        {
          credentials: "include"
        }
      )
      const data: Response<Collection> = await res.json()

      const collection = data.data

      if (data.data.items) {
        for (const item of data.data.items) {
          if (item.status === "owned") {
            itemsOwned = itemsOwned + 1
            priceOwned = priceOwned + item.price
          } else if (item.status === "wish") {
            itemsWishlisted = itemsWishlisted + 1
            priceWishlisted = priceWishlisted + item.price
          }
        }
      }

      setLoading(false)
      return { collection, itemsOwned, priceOwned, itemsWishlisted, priceWishlisted }
    }
  })

  if (loading)
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
                <ItemDescription className="text-foreground text-lg">~0 kr</ItemDescription>
                <ItemDescription className="text-xs text-primary">0 items</ItemDescription>
              </ItemContent>
            </Item>
          </Skeleton>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index}>
            <Item variant="outline" className="opacity-0">
              <ItemContent className="flex gap-3">
                <AspectRatio ratio={16 / 9}>
                  <ItemMedia className="bg-card h-full rounded-sm border border-dashed text-3xl text-muted-foreground">
                    N
                  </ItemMedia>
                </AspectRatio>
                <div>
                  <ItemTitle className="text-nowrap text-ellipsis">Name</ItemTitle>
                  <ItemDescription className="text-nowrap text-ellipsis text-xs">
                    Description
                  </ItemDescription>
                  <ItemDescription className="text-primary-foreground text-nowrap text-ellipsis">
                    0 kr
                  </ItemDescription>
                </div>
              </ItemContent>
            </Item>
          </Skeleton>
        ))}

        <Skeleton>
          <Link
            to={"/collection/$collectionID/new"}
            params={{ collectionID: collectionID }}
            disabled
            className="opacity-0"
          >
            <Button
              variant="outline"
              className="border-dashed w-full h-full bg-transparent! pt-2 pb-2"
            >
              <CirclePlus data-icon="inline-start" />
              New item
            </Button>
          </Link>
        </Skeleton>
      </div>
    )

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
      <div className="flex flex-col gap-2">
        {data?.collection.items?.map((item) => {
          return (
            <Item variant="outline">
              <ItemContent className="flex gap-3">
                <AspectRatio ratio={16 / 9}>
                  <ItemMedia className="bg-card h-full rounded-sm border border-dashed text-3xl text-muted-foreground">
                    {item.name[0]}
                  </ItemMedia>
                </AspectRatio>
                <div>
                  <ItemTitle className="text-nowrap text-ellipsis">{item.name}</ItemTitle>
                  <ItemDescription className="text-nowrap text-ellipsis text-xs">
                    {data.collection.collectionFields?.map((cf, index) => {
                      return (
                        <>
                          {item.custom[cf.key] as string} {cf.unit.length > 0 ? cf.unit : null}{" "}
                          {data.collection.items && index <= data.collection.items?.length && "· "}
                        </>
                      )
                    })}
                  </ItemDescription>
                  <ItemDescription className="text-primary-foreground text-nowrap text-ellipsis">
                    {item.status === "owned" ? (
                      <p>{item.price} kr</p>
                    ) : (
                      <div className="flex justify-between">
                        <p className="text-primary">~{item.price} kr</p>{" "}
                        <div className="bg-primary/5 border border-primary/20 rounded-full pl-2 pr-2 pt-1 pb-1 text-xs text-primary">
                          Wish
                        </div>
                      </div>
                    )}
                  </ItemDescription>
                </div>
              </ItemContent>
            </Item>
          )
        })}
        <Link to={"/collection/$collectionID/new"} params={{ collectionID: collectionID }}>
          <Button
            variant="outline"
            className="border-dashed w-full h-full bg-transparent! pt-2 pb-2"
          >
            <CirclePlus data-icon="inline-start" />
            New item
          </Button>
        </Link>
      </div>
    </div>
  )
}