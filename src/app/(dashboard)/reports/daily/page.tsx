'use client'
import { useState, useEffect } from 'react'
import { DateRange, TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material'
import StatsCard from '../../users/StatsCard'
import DataTable from '../../../components/table/page'

interface DailyReport {
  date: string
  total_bets: number
  total_amount: number
  total_wins: number
  profit_loss: number
}

export default function DailyReportsPage() {
  const [reports, setReports] = useState<DailyReport[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    setReports([
      { date: '2024-01-15', total_bets: 150, total_amount: 45000, total_wins: 35000, profit_loss: 10000 },
      { date: '2024-01-14', total_bets: 120, total_amount: 38000, total_wins: 42000, profit_loss: -4000 },
      { date: '2024-01-13', total_bets: 180, total_amount: 52000, total_wins: 38000, profit_loss: 14000 }
    ])
    setLoading(false)
  }, [])

  const todayData = reports[0] || { total_bets: 0, total_amount: 0, total_wins: 0, profit_loss: 0 }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DateRange className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Daily Profit/Loss</h1>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          suppressHydrationWarning
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Bets"
          value={todayData.total_bets}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Amount"
          value={`₹${todayData.total_amount.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Wins"
          value={`₹${todayData.total_wins.toLocaleString()}`}
          icon={<TrendingDown className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Profit/Loss"
          value={`₹${todayData.profit_loss.toLocaleString()}`}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient={todayData.profit_loss >= 0 ? "from-green-500 to-green-600" : "from-red-500 to-red-600"}
        />
      </div>

      <DataTable<DailyReport>
        data={reports}
        columns={[
          {
            key: 'date',
            label: 'Date',
            render: (value) => new Date(String(value)).toLocaleDateString()
          },
          { key: 'total_bets', label: 'Total Bets' },
          {
            key: 'total_amount',
            label: 'Total Amount',
            render: (value) => `₹${Number(value).toLocaleString()}`
          },
          {
            key: 'total_wins',
            label: 'Total Wins',
            render: (value) => `₹${Number(value).toLocaleString()}`
          },
          {
            key: 'profit_loss',
            label: 'Profit/Loss',
            render: (value) => (
              <span className={`font-medium ${Number(value) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Number(value).toLocaleString()}
              </span>
            )
          }
        ]}
        emptyMessage="No reports found"
        loading={loading}
      />
    </div>
  )
}