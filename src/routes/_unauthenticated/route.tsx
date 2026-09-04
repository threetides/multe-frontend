import type { Response, Session } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated")({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()

  const { isPending, error } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/session`, {
        credentials: "include"
      })
      const data: Response<Session> = await res.json()
      if (res.status === 200 && data.data) navigate({ to: "/" })
      if (!res.ok && res.status !== 401) throw new Error(data.message || "Internal server error.")
      return data
    }
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return <main className="p-4 pb-20 overflow-hidden h-full">{!isPending && <Outlet />}</main>
}