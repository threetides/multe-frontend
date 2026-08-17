import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import type { Collection, Item as ItemType } from "@/shared/types"
import { Link } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"
import type { FC } from "react"

interface CollectionListProps {
  collections: Collection[]
  items: ItemType[]
}

export const CollectionList: FC<CollectionListProps> = ({ collections, items }) => {
  return (
    <div className="flex flex-col gap-2">
      {collections.map((collection) => {
        const itemsOwned = items.filter((item) => {
          return item.collectionID === collection.id && item.status === "owned"
        }).length

        let priceOwned = 0

        for (const item of items) {
          if (item.collectionID === collection.id && item.status === "owned")
            priceOwned = priceOwned + item.price
        }

        const itemsWishlisted = items.filter((item) => {
          return item.collectionID === collection.id && item.status === "wish"
        }).length

        let priceWishlisted = 0

        for (const item of items) {
          if (item.collectionID === collection.id && item.status === "wish")
            priceWishlisted = priceWishlisted + item.price
        }

        return (
          <Item variant="outline" key={collection.id} className="gap-4">
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
        )
      })}
      <Link to="/collection/new">
        <Button variant="outline" className="border-dashed w-full">
          <CirclePlus data-icon="inline-start" />
          New collection
        </Button>
      </Link>
    </div>
  )
}