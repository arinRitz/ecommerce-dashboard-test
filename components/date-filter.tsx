// components/date-filter.tsx
'use client'

interface DateFilterProps {
  className?: string
  onDateChange?: (range: string) => void
}

export function DateFilter({ className, onDateChange }: DateFilterProps) {
  const timeRanges = [
    { label: 'Daily', value: 'day' },
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
    { label: 'Annually', value: 'year' },
  ]

  return (
    <div className={className}>
      <select
        onChange={(e) => onDateChange?.(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        {timeRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  )
}