import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/styles/index.css"
import "@/styles/tokens.css"
import "@/styles/reset.css"
import { Button } from "@/components/Button/Button"

const testAPI = async () => {
  const response = await fetch("http://localhost:8080/api/test", {
    method: "GET",
    credentials: "include"
  })
  const parsed = await response.json()
  console.log(parsed)
}

const getSession = async () => {
  const response = await fetch("http://localhost:8080/api/auth/session", {
    method: "GET",
    credentials: "include"
  })
  const parsed = await response.json()
  console.log(parsed)
}

const logout = async () => {
  const response = await fetch("http://localhost:8080/api/auth/logout", {
    method: "POST",
    credentials: "include"
  })
  const parsed = await response.json()
  console.log(parsed)
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>multe</h1>
    <a href="http://localhost:8080/api/auth/google/login">
      <Button variant="outline">Sign in with Google</Button>
    </a>
    <Button variant="outline" onClick={testAPI}>
      Test API
    </Button>
    <Button variant="outline" onClick={getSession}>
      Get session
    </Button>
    <Button variant="outline" onClick={logout}>
      Sign out
    </Button>
  </StrictMode>
)