import { userAtom } from "@/shared/atoms"
import { createFileRoute } from "@tanstack/react-router"
import { useAtomValue } from "jotai"

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent
})

function RouteComponent() {
  const user = useAtomValue(userAtom)

  return <h1>Hello {user?.name}</h1>
}