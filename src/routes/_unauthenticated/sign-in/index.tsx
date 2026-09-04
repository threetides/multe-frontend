import { SignInForm } from "@/features/auth/SignInForm"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated/sign-in/")({
  component: RouteComponent
})

function RouteComponent() {
  return <SignInForm />
}