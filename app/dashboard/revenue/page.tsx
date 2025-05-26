'use client'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { salesData } from '@/lib/data/sales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { DateRangePicker } from '@/components/ui/date-range-picker'

// Define available categories
const categories = ['All', 'Electronics', 'Stationery']

export default function RevenuePage() {
  // 1️⃣ State for category filter
  const [category, setCategory] = useState('All')

  // 2️⃣ State for date range (defaults: last month to today)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  })

  // 3️⃣ Filtered data by category + date
  const filteredData = salesData.filter((s) => {
    const saleDate = new Date(s.date)

    const isInCategory = category === 'All' || s.category === category
    const isInRange =
      dateRange.from &&
      dateRange.to &&
      saleDate >= dateRange.from &&
      saleDate <= dateRange.to

    return isInCategory && isInRange
  })

  // 4️⃣ Metrics from filtered data
  const totalRevenue = filteredData.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalOrders = filteredData.reduce((acc, curr) => acc + curr.orders, 0)

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Revenue Analysis</h2>

        {/* Category Selector */}
        <Select onValueChange={setCategory} defaultValue="All">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="flex justify-end">
        <DateRangePicker date={dateRange} setDate={setDateRange} />
      </div>

      {/* Revenue & Orders Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${totalRevenue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{totalOrders}</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
