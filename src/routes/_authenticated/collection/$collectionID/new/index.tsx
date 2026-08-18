import { NewItem } from "@/features/items/NewItem"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/collection/$collectionID/new/")({
  component: RouteComponent
})

function RouteComponent() {
  const { collectionID } = Route.useParams()

  return <NewItem collectionID={collectionID} />
}