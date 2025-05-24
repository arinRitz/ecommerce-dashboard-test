// app/dashboard/revenue/page.tsx
import { RevenueChart } from '@/components/revenue-chart'
import { MetricCards } from '@/components/metric-card'
import { DateFilter } from '@/components/date-filter'

export default function RevenuePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Revenue Analysis</h1>
        <DateFilter />
      </div>
      
      <MetricCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart title="Sales Trend" type="line" />
        <RevenueChart title="Category Comparison" type="bar" />
      </div>
    </div>
  )
}