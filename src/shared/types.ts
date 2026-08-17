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
  updatedAt: Date
}

export interface Collection {
  id: string
  userID: string
  name: string
  emoji: string
  createdAt: Date
  updatedAt: Date
}

export interface Item {
  id: string
  collectionID: string
  name: string
  status: "owned" | "wish"
  price: number
  dateBought: Date
  location: string
  custom: { field: string; value: unknown }[]
  createdAt: Date
  updatedAt: Date
}