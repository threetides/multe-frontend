import { Button } from "@/components/Button/Button"
import { userAtom } from "@/shared/atoms"
import type { authResponse } from "@/shared/types"
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router"
import { getDefaultStore, useAtomValue } from "jotai"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/session`, {
      method: "GET",
      credentials: "include"
    })
    const parsed: authResponse = await response.json()
    if (!response.ok || !parsed.data) {
      throw redirect({
        to: "/sign-in"
      })
    } else {
      const store = getDefaultStore()
      store.set(userAtom, parsed.data)
    }
  }
})

function RouteComponent() {
  const navigate = useNavigate()
  const user = useAtomValue(userAtom)

  const testAPI = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/test`, {
      method: "GET",
      credentials: "include"
    })
    const parsed = await response.json()
    console.log(parsed)
  }

  const getSession = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/session`, {
      method: "GET",
      credentials: "include"
    })
    const parsed: authResponse = await response.json()
    console.log(parsed)
  }

  const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
    const parsed = await response.json()
    console.log(parsed)
    navigate({ to: "/sign-in" })
  }

  if (user) {
    return (
      <div>
        <nav>
          <Button variant="outline" onClick={testAPI}>
            Test API
          </Button>
          <Button variant="outline" onClick={getSession}>
            Get session
          </Button>
          <Button variant="outline" onClick={logout}>
            Sign out
          </Button>
        </nav>
        <Outlet />
      </div>
    )
  }
}