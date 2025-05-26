"use client"

import { TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { date: "2024-01", revenue: 4000, orders: 240 },
  { date: "2024-02", revenue: 3000, orders: 139 },
  { date: "2024-03", revenue: 2000, orders: 980 },
  { date: "2024-04", revenue: 2780, orders: 390 },
  { date: "2024-05", revenue: 1890, orders: 480 },
  { date: "2024-06", revenue: 2390, orders: 380 },
]

export function ChartCn() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Revenue & Orders Overview</CardTitle>
        <CardDescription className="text-muted-foreground">
          January – June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* Tailwind gray-200 */}
            <XAxis dataKey="date" stroke="#9ca3af" tickLine={false} axisLine={false} /> {/* gray-400 */}
            <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 6, borderColor: '#e5e7eb', fontSize: 12 }}
              labelStyle={{ color: '#6b7280' }} // gray-500
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6" // Tailwind blue-500
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10b981" // Tailwind green-500
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="flex items-center gap-2 font-medium text-foreground">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground">
          Showing revenue and orders for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
