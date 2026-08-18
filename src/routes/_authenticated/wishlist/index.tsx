import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/wishlist/")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/_authenticated/wishlist/"!</div>
}