import { SignUpForm } from "@/features/auth/SignUpForm"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated/sign-up/")({
  component: RouteComponent
})

function RouteComponent() {
  return <SignUpForm />
}