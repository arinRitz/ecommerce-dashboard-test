// components/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const routes = [
  { label: 'Revenue', path: '/dashboard/revenue' },
  { label: 'Inventory', path: '/dashboard/inventory' },
  { label: 'Register Product', path: '/dashboard/register' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full md:w-64 bg-white border-r h-screen flex-shrink-0">
      <div className="p-4 text-xl font-semibold">Forsit</div>
      <nav className="flex flex-col space-y-2 p-4">
        {routes.map(route => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              'px-4 py-2 rounded hover:bg-gray-100',
              pathname === route.path && 'bg-blue-100 font-medium'
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
