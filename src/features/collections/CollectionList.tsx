import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import type { Collection } from "@/shared/types"
import { Link } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"
import type { FC } from "react"

interface CollectionListProps {
  collections: Collection[]
}

export const CollectionList: FC<CollectionListProps> = ({ collections }) => {
  return (
    <div className="grid auto-rows-fr gap-2">
      {collections.map((collection) => {
        let itemsOwned = 0
        let priceOwned = 0
        let itemsWishlisted = 0
        let priceWishlisted = 0

        if (collection.items) {
          itemsOwned = collection.items.length

          for (const item of collection.items) {
            if (item.collectionID === collection.id && item.status === "owned")
              priceOwned = priceOwned + item.price
          }

          itemsWishlisted = collection.items.filter((item) => {
            return item.collectionID === collection.id && item.status === "wish"
          }).length

          for (const item of collection.items) {
            if (item.collectionID === collection.id && item.status === "wish")
              priceWishlisted = priceWishlisted + item.price
          }
        }

        return (
          <Link
            to="/collection/$collectionID"
            params={{ collectionID: collection.id }}
            key={collection.id}
          >
            <Item variant="outline" className="gap-4 h-full">
              <ItemMedia className="bg-muted text-3xl aspect-square size-12 rounded-sm self-center!">
                {collection.emoji}
              </ItemMedia>
              <ItemContent className="flex-col">
                <ItemTitle>{collection.name}</ItemTitle>
                <ItemDescription className="flex text-xs items-center">
                  {itemsOwned} owned · {priceOwned} kr
                </ItemDescription>
                <ItemDescription className="flex text-xs items-center text-primary-foreground">
                  {itemsWishlisted} wishlisted · ~{priceWishlisted} kr
                </ItemDescription>
              </ItemContent>
            </Item>
          </Link>
        )
      })}
      <Link to="/collection/new">
        <Button variant="outline" className="border-dashed w-full h-full bg-transparent!">
          <CirclePlus data-icon="inline-start" />
          New collection
        </Button>
      </Link>
    </div>
  )
}