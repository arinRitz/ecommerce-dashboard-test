// components/metric-cards.tsx
'use client'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

const metrics = [
  { id: 1, title: 'Total Sales', value: '$45,231', diff: '+12.5%' },
  { id: 2, title: 'Total Orders', value: '2,345', diff: '-2.4%' },
  { id: 3, title: 'Avg. Order Value', value: '$123', diff: '+4.3%' },
  { id: 4, title: 'Conversion Rate', value: '3.2%', diff: '+0.8%' },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {metric.value}
            </p>
            <div className="ml-2 flex items-center text-sm font-medium">
              {metric.diff.startsWith('+') ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  metric.diff.startsWith('+')
                    ? 'text-green-600 ml-1'
                    : 'text-red-600 ml-1'
                }
              >
                {metric.diff}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}