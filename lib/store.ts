// lib/store.ts
import { products as initialProducts } from './data/products'

let products = [...initialProducts]

export const getProducts = () => products

export const addProduct = (product: any) => {
  products.push({ id: Date.now(), ...product })
}

export const updateStock = (id: number, newStock: number) => {
  products = products.map(p => (p.id === id ? { ...p, stock: newStock } : p))
}
