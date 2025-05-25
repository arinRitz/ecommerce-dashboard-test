// components/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Revenue', href: '/dashboard/revenue' },
  { name: 'Inventory', href: '/dashboard/inventory' },
  { name: 'Register Product', href: '/dashboard/register' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-6 font-bold text-xl">Forsit Admin</div>
      <nav className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'px-4 py-2 rounded hover:bg-blue-100',
              pathname === item.href ? 'bg-blue-200 font-medium' : ''
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
