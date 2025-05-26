// lib/types.ts
export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  stock: number
  image?: string
}

export type SaleData = {
  date: string
  category: string
  revenue: number
  orders: number
}