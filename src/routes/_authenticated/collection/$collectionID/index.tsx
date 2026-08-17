import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/collection/$collectionID/")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/_authenticated/collection/$collectionID/"!</div>
}