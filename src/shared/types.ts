export interface Response<T> {
  message: string
  data: T
}

export interface Session {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: Date
}