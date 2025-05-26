// app/dashboard/inventory/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Product } from '@/lib/types'

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'stock' | 'price'; direction: 'asc' | 'desc' } | null>(null)

  useEffect(() => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) setProducts(JSON.parse(savedProducts))
  }, [])

  const handleEdit = (id: string, field: 'price' | 'stock', value: string) => {
    const updated = products.map(p => 
      p.id === id ? { ...p, [field]: Number(value) } : p
    )
    setProducts(updated)
    localStorage.setItem('products', JSON.stringify(updated))
  }

  const getStatus = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>
    if (stock <= 5) return <Badge variant="secondary">Low Stock</Badge>
    return <Badge variant="default">In Stock</Badge>
  }

  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === 'all' || p.category === categoryFilter)
    )
    .sort((a, b) => {
      if (!sortConfig) return 0
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

  const requestSort = (key: 'name' | 'stock' | 'price') => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Management</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Select onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Array.from(new Set(products.map(p => p.category))).map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
                Product {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('price')}>
                Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('stock')}>
                Stock {sortConfig?.key === 'stock' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleEdit(product.id, 'price', e.target.value)}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => handleEdit(product.id, 'stock', e.target.value)}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>{getStatus(product.stock)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}