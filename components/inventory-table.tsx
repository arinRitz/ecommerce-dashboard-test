// components/inventory-table.tsx
'use client'
import { useState, useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  lowStockThreshold?: number
}

interface InventoryTableProps {
  searchQuery?: string
  selectedCategory?: string
}

const sampleInventory: InventoryItem[] = [
  { id: '1', name: 'Wireless Headphones', category: 'Electronics', stock: 25, lowStockThreshold: 30 },
  { id: '2', name: 'Smart Watch', category: 'Electronics', stock: 45 },
  { id: '3', name: 'Cotton T-Shirt', category: 'Clothing', stock: 150 },
  { id: '4', name: 'Running Shoes', category: 'Footwear', stock: 12, lowStockThreshold: 20 },
  { id: '5', name: 'Bluetooth Speaker', category: 'Electronics', stock: 60 },
  { id: '6', name: 'Leather Wallet', category: 'Accessories', stock: 8, lowStockThreshold: 15 },
]

export function InventoryTable({ searchQuery = '', selectedCategory = 'All' }: InventoryTableProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    // Load from localStorage or use sample data
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('products')
      return saved ? JSON.parse(saved) : sampleInventory
    }
    return sampleInventory
  })
  
  const [editId, setEditId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(inventory))
  }, [inventory])

  // Filtering logic
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUpdate = (id: string) => {
    const updatedInventory = inventory.map(item => 
      item.id === id ? { ...item, stock: parseInt(editValue) || 0 } : item
    )
    setInventory(updatedInventory)
    setEditId(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header remains the same */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>

        {/* Table body remains the same */}
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInventory.map((item) => {
            const lowThreshold = item.lowStockThreshold || 50
            const isLowStock = item.stock < lowThreshold
            
            return (
              <tr key={item.id}>
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                <td className="px-6 py-4">
                  {editId === item.id ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                      min="0"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={isLowStock ? 'text-red-500 font-medium' : ''}>
                        {item.stock}
                      </span>
                      {isLowStock && (
                        <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {isLowStock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Low Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === item.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(item.id)
                        setEditValue(item.stock.toString())
                      }}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}