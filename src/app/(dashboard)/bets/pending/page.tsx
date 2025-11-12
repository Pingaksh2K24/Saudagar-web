'use client'
import { useState, useEffect } from 'react'
import { AccessTime, Search } from '@mui/icons-material'
import DataTable from '@/components/table/index'
import { ViewButton } from '@/components/action/index'
import StatsCard from '../../users/StatsCard'

interface PendingBet extends Record<string, unknown> {
  id: number
  user_name: string
  game_name: string
  bet_type: string
  bet_number: string
  amount: number
  draw_time: string
  created_at: string
  [key: string]: unknown
}

export default function PendingBetsPage() {
  const [pendingBets, setPendingBets] = useState<PendingBet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data
    setPendingBets([
      { id: 1, user_name: 'Mike Johnson', game_name: 'Mumbai Day', bet_type: 'single', bet_number: '8', amount: 250, draw_time: '12:00 PM', created_at: '2024-01-03' },
      { id: 2, user_name: 'Sarah Davis', game_name: 'Delhi Night', bet_type: 'panna', bet_number: '123', amount: 400, draw_time: '08:00 PM', created_at: '2024-01-03' }
    ])
    setLoading(false)
  }, [])

  const totalPendingAmount = pendingBets.reduce((sum, bet) => sum + bet.amount, 0)

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <AccessTime className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Pending Bets</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Pending Bets"
          value={pendingBets.length}
          icon={<AccessTime className="w-6 h-6" />}
          gradient="from-yellow-500 to-yellow-600"
        />
        <StatsCard
          title="Total Pending Amount"
          value={`₹${totalPendingAmount.toLocaleString()}`}
          icon={<AccessTime className="w-6 h-6" />}
          gradient="from-orange-500 to-orange-600"
        />
        <StatsCard
          title="Single Bets"
          value={pendingBets.filter(b => b.bet_type === 'single').length}
          icon={<AccessTime className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Jodi/Panna Bets"
          value={pendingBets.filter(b => b.bet_type !== 'single').length}
          icon={<AccessTime className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pending bets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <DataTable<PendingBet>
        data={pendingBets.filter(bet => {
          const matchesSearch = searchTerm === '' || 
            bet.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bet.game_name?.toLowerCase().includes(searchTerm.toLowerCase())
          return matchesSearch
        })}
        columns={[
          {
            key: 'user_name',
            label: 'User',
            sortable: true,
            render: (value, bet) => (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <AccessTime className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{String(value)}</div>
                  <div className="text-sm text-gray-500">ID: {bet.id}</div>
                </div>
              </div>
            )
          },
          {
            key: 'game_name',
            label: 'Game',
            render: (value) => <span className="text-sm font-medium">{String(value)}</span>
          },
          {
            key: 'bet_type',
            label: 'Type',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                value === 'single' ? 'bg-blue-100 text-blue-800' :
                value === 'jodi' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {String(value)}
              </span>
            )
          },
          {
            key: 'bet_number',
            label: 'Number',
            render: (value) => (
              <span className="bg-yellow-100 px-2 py-1 rounded text-sm font-mono text-yellow-800">{String(value)}</span>
            )
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (value) => <span className="text-sm font-medium">₹{String(value)}</span>
          },
          {
            key: 'draw_time',
            label: 'Draw Time',
            render: (value) => (
              <span className="text-sm font-medium text-red-600">{String(value)}</span>
            )
          },
          {
            key: 'created_at',
            label: 'Bet Date',
            render: (value) => (
              <span className="text-sm text-gray-500">
                {new Date(String(value)).toLocaleDateString()}
              </span>
            )
          }
        ]}
        emptyMessage="No pending bets found"
        loading={loading}
        actions={(bet) => (
          <div className="flex items-center justify-end">
            <ViewButton size="small" onClick={() => console.log('View', bet.id)} />
          </div>
        )}
      />
    </div>
  )
}