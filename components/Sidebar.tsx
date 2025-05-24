import Link from 'next/link'
import { ChartBarIcon, CubeIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export function Sidebar() {
  const navigation = [
    { name: 'Revenue', href: '/dashboard/revenue', icon: ChartBarIcon },
    { name: 'Inventory', href: '/dashboard/inventory', icon: CubeIcon },
    { name: 'Add Product', href: '/dashboard/add-item', icon: PlusCircleIcon },
  ]

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <nav className="mt-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}