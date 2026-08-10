import { Button } from "@/components/Button/Button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated/sign-in/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <a href="http://localhost:8080/api/auth/google/login">
        <Button variant="outline">Sign in with Google</Button>
      </a>
    </>
  )
}