'use client'
import { useState, useEffect } from 'react'
import { Group, Person, TrendingUp, AccountBalance } from '@mui/icons-material'
import StatsCard from '../../users/StatsCard'
import DataTable from '../../../components/table/page'
import { ViewButton } from '../../../components/action/page'

interface UserReport {
  user_name: string
  total_bets: number
  total_amount: number
  total_wins: number
  profit_loss: number
  last_activity: string
}

export default function UserWiseReportsPage() {
  const [reports, setReports] = useState<UserReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setReports([
      { user_name: 'John Doe', total_bets: 45, total_amount: 15000, total_wins: 12000, profit_loss: 3000, last_activity: '2024-01-15' },
      { user_name: 'Jane Smith', total_bets: 32, total_amount: 8000, total_wins: 9500, profit_loss: -1500, last_activity: '2024-01-15' },
      { user_name: 'Mike Johnson', total_bets: 28, total_amount: 7500, total_wins: 6000, profit_loss: 1500, last_activity: '2024-01-14' },
      { user_name: 'Sarah Wilson', total_bets: 55, total_amount: 18000, total_wins: 15000, profit_loss: 3000, last_activity: '2024-01-13' }
    ])
    setLoading(false)
  }, [])

  const activeUsers = reports.length
  const totalProfit = reports.reduce((sum, user) => sum + user.profit_loss, 0)
  const totalBets = reports.reduce((sum, user) => sum + user.total_bets, 0)
  const avgBetsPerUser = activeUsers > 0 ? Math.round(totalBets / activeUsers) : 0

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Group className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">User-wise Performance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Users"
          value={activeUsers}
          icon={<Person className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Bets"
          value={totalBets}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Avg Bets/User"
          value={avgBetsPerUser}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Net from Users"
          value={`₹${totalProfit.toLocaleString()}`}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient={totalProfit >= 0 ? "from-green-500 to-green-600" : "from-red-500 to-red-600"}
        />
      </div>

      <DataTable<UserReport>
        data={reports}
        columns={[
          {
            key: 'user_name',
            label: 'User',
            render: (value) => (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Person className="w-4 h-4 text-white" />
                </div>
                <span className="ml-3">{String(value)}</span>
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
            label: 'Our Profit/Loss',
            render: (value) => (
              <span className={`font-medium ${Number(value) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Number(value).toLocaleString()}
              </span>
            )
          },
          {
            key: 'last_activity',
            label: 'Last Activity',
            render: (value) => new Date(String(value)).toLocaleDateString()
          }
        ]}
        emptyMessage="No user reports found"
        loading={loading}
        actions={(user) => (
          <ViewButton size="small" onClick={() => console.log('View user details', user.user_name)} />
        )}
      />
    </div>
  )
}