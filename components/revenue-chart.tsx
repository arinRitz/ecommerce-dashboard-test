// components/revenue-chart.tsx
'use client'
import { useState } from 'react'
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar } from 'recharts'

// Generate demo data based on chart type
const generateDemoData = () => {
  // For line chart (time-based data)
  const lineData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 30 + i)
    return {
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      sales: Math.floor(Math.random() * 1000) + 500, // Random sales between 500-1500
      orders: Math.floor(Math.random() * 200) + 100 // Random orders between 100-300
    }
  })

  // For bar chart (category-based data)
  const categories = ['Electronics', 'Clothing', 'Home Goods', 'Books', 'Beauty']
  const barData = categories.map(category => ({
    category,
    revenue: Math.floor(Math.random() * 10000) + 5000 // Random revenue between 5000-15000
  }))

  return { lineData, barData }
}

export function RevenueChart({ title, type }: { title: string; type: 'line' | 'bar' }) {
  const [data] = useState(generateDemoData())

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-80">
        {type === 'line' ? (
          <LineChart
            width={600}
            height={300}
            data={data.lineData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        ) : (
          <BarChart
            width={600}
            height={300}
            data={data.barData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="revenue" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </div>
    </div>
  )
}