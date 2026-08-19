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
  collectionFields: CollectionField[] | null
  items: Item[] | null
  createdAt: Date
  updatedAt: Date
}

export interface CollectionField {
  id: string
  collectionID: string
  key: string
  label: string
  type: "text" | "number"
  unit: string
  position: number
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
  custom: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}