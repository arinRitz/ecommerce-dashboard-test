import {Sidebar} from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}