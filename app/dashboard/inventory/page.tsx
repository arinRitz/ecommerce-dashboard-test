// app/dashboard/inventory/page.tsx
'use client'
import { useState } from 'react'
import { InventoryTable } from '@/components/inventory-table'
import { SearchFilter } from '@/components/search-filter'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <SearchFilter 
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      
      <InventoryTable 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}