// app/dashboard/layout.tsx
import Sidebar from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

