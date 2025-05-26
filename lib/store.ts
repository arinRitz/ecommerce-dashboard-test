// lib/store.ts
let products = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', stock: 5, price: 25 },
]

export const getProducts = () => products

export const addProduct = (product: any) => {
  products.push({ ...product, id: Date.now() })
}
