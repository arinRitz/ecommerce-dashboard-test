// app/dashboard/revenue/page.tsx
'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { salesData } from '@/lib/data/sales'

export default function RevenuePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Revenue Overview</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
