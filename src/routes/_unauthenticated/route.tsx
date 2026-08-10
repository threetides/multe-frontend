import type { authResponse } from "@/shared/types"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated")({
  component: RouteComponent,
  beforeLoad: async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/session`, {
      method: "GET",
      credentials: "include"
    })
    const parsed: authResponse = await response.json()
    if (response.ok && parsed.data) {
      throw redirect({
        to: "/"
      })
    }
  }
})

function RouteComponent() {
  return <Outlet />
}