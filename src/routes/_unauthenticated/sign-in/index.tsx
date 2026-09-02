import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated/sign-in/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <a
        href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/sign-in?return_error=/sign-in&return_success=/`}
      >
        <Button variant="outline">Sign in with Google</Button>
      </a>
    </>
  )
}