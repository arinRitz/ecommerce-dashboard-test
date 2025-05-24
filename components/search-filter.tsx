// components/search-filter.tsx
'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchFilterProps {
  onCategoryChange?: (category: string) => void
  onSearch?: (query: string) => void
}

export function SearchFilter({ onCategoryChange, onSearch }: SearchFilterProps) {
  const categories = ['All', 'Electronics', 'Clothing', 'Footwear', 'Accessories']

  return (
    <div className="flex gap-4 items-center">
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Search products..."
          className="block w-48 rounded-md border-gray-300 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      
      <select
        onChange={(e) => onCategoryChange?.(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}