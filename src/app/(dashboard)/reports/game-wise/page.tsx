'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, SportsEsports, BarChart } from '@mui/icons-material'
import StatsCard from '../../users/StatsCard'
import DataTable from '../../../components/table/page'

interface GameReport extends Record<string, unknown> {
  game_name: string
  total_bets: number
  total_amount: number
  total_wins: number
  profit_loss: number
  win_percentage: number
  [key: string]: unknown
}

export default function GameWiseReportsPage() {
  const [reports, setReports] = useState<GameReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setReports([
      { game_name: 'Mumbai Day', total_bets: 85, total_amount: 25000, total_wins: 18000, profit_loss: 7000, win_percentage: 72 },
      { game_name: 'Delhi Night', total_bets: 65, total_amount: 20000, total_wins: 22000, profit_loss: -2000, win_percentage: 110 },
      { game_name: 'Gali Game', total_bets: 45, total_amount: 12000, total_wins: 8000, profit_loss: 4000, win_percentage: 67 }
    ])
    setLoading(false)
  }, [])

  const totalProfit = reports.reduce((sum, game) => sum + game.profit_loss, 0)
  const totalBets = reports.reduce((sum, game) => sum + game.total_bets, 0)
  const totalAmount = reports.reduce((sum, game) => sum + game.total_amount, 0)

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Game-wise Earnings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Games"
          value={reports.length}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Bets"
          value={totalBets}
          icon={<BarChart className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Net Profit"
          value={`₹${totalProfit.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient={totalProfit >= 0 ? "from-green-500 to-green-600" : "from-red-500 to-red-600"}
        />
      </div>

      <DataTable<GameReport>
        data={reports}
        columns={[
          {
            key: 'game_name',
            label: 'Game',
            render: (value) => (
              <div className="flex items-center">
                <SportsEsports className="w-5 h-5 text-red-500 mr-2" />
                {String(value)}
              </div>
            )
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
          },
          {
            key: 'win_percentage',
            label: 'Win %',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                Number(value) > 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {String(value)}%
              </span>
            )
          }
        ]}
        emptyMessage="No game reports found"
        loading={loading}
      />
    </div>
  )
}