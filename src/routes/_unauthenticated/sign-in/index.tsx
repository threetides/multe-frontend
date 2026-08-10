import { Button } from "@/components/Button/Button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated/sign-in/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/login`}>
        <Button variant="outline">Sign in with Google</Button>
      </a>
    </>
  )
}