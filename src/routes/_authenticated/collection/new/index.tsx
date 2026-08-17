import { NewCollection } from "@/features/collections/NewCollection"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/collection/new/")({
  component: RouteComponent
})

function RouteComponent() {
  return <NewCollection />
}