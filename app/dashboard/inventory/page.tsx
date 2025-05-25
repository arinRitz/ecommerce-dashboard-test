// app/dashboard/inventory/page.tsx
'use client'
import { useState } from 'react'
import { products as mockData } from '@/lib/data/products'

export default function InventoryPage() {
  const [search, setSearch] = useState('')

  const filtered = mockData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">
                {product.stock === 0 ? (
                  <span className="text-red-500 font-semibold">Out of stock</span>
                ) : product.stock <= 5 ? (
                  <span className="text-yellow-500">Low stock</span>
                ) : (
                  <span className="text-green-500">In stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
