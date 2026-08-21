import { BottombarMobile } from "@/features/navigation/BottombarMobile"
import { TopbarMobile } from "@/features/navigation/TopbarMobile"
import type { Response, Session } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => {}
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
      if (!res.ok) throw new Error(data.message || "Internal server error.")

      if (res.status === 401 || !data.data) navigate({ to: "/sign-in" })

      return data
    }
  })

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <TopbarMobile />
      <main className="p-4 pb-20 overflow-hidden">{!isPending && <Outlet />}</main>
      <BottombarMobile />
    </>
  )
}