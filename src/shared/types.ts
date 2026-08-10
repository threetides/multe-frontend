export interface user {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
}

export interface authResponse {
  message: string
  data: user
}