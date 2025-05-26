// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ChartCn } from '@/components/ui/chartcn'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface Sale {
  date: string
  category: string
  revenue: number
  orders: number
}

interface Product {
  id: string
  category: string
  stock: number
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    const savedProducts = localStorage.getItem('products')
    const savedSales = localStorage.getItem('salesData')
    if (savedProducts) setProducts(JSON.parse(savedProducts))
    if (savedSales) setSales(JSON.parse(savedSales))
  }, [])

  // Metrics calculations
  const totalProducts = products.length
  const lowStockCount = products.filter(p => p.stock <= 5).length
  const totalRevenue = sales.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalOrders = sales.reduce((acc, curr) => acc + curr.orders, 0)

  // Process sales data for charts
  const salesByDate = sales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = { date, revenue: 0, orders: 0 }
    }
    acc[date].revenue += sale.revenue
    acc[date].orders += sale.orders
    return acc
  }, {} as Record<string, { date: string; revenue: number; orders: number }>)

  const chartData = Object.values(salesByDate).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Inventory by category
  const inventoryByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryData = Object.entries(inventoryByCategory).map(([name, count]) => ({
    name,
    count
  }))

  // Recent sales data
  const recentSales = sales.slice(-5).reverse()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Seller Dashboard Overview</h2>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lowStockCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-100% w-100%">
              <ResponsiveContainer width="100%" height="100%">
                {/* <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart> */}
                <ChartCn />
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#4f46e5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.date}>
                  <TableCell>
                    {new Date(sale.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{sale.category}</Badge>
                  </TableCell>
                  <TableCell>${sale.revenue}</TableCell>
                  <TableCell>{sale.orders}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}