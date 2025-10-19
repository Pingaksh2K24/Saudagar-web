'use client'
import { useState, useEffect } from 'react'
import { Cancel, Search } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { ViewButton } from '../../../components/action/page'
import StatsCard from '../../users/StatsCard'

interface LostBet {
  id: number
  user_name: string
  game_name: string
  bet_type: string
  bet_number: string
  amount: number
  winning_number: string
  created_at: string
}

export default function LostBetsPage() {
  const [lostBets, setLostBets] = useState<LostBet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data
    setLostBets([
      { id: 1, user_name: 'Jane Smith', game_name: 'Mumbai Day', bet_type: 'single', bet_number: '3', amount: 150, winning_number: '7', created_at: '2024-01-01' },
      { id: 2, user_name: 'Bob Wilson', game_name: 'Delhi Night', bet_type: 'jodi', bet_number: '45', amount: 300, winning_number: '78', created_at: '2024-01-02' }
    ])
    setLoading(false)
  }, [])

  const totalLostAmount = lostBets.reduce((sum, bet) => sum + bet.amount, 0)

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Cancel className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Lost Bets</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Lost Bets"
          value={lostBets.length}
          icon={<Cancel className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Total Lost Amount"
          value={`₹${totalLostAmount.toLocaleString()}`}
          icon={<Cancel className="w-6 h-6" />}
          gradient="from-orange-500 to-orange-600"
        />
        <StatsCard
          title="House Profit"
          value={`₹${totalLostAmount.toLocaleString()}`}
          icon={<Cancel className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Average Bet"
          value={`₹${Math.round(totalLostAmount / lostBets.length || 0)}`}
          icon={<Cancel className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search lost bets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <DataTable<LostBet>
        data={lostBets.filter(bet => {
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
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <Cancel className="w-5 h-5 text-white" />
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
            label: 'Bet Number',
            render: (value) => (
              <span className="bg-red-100 px-2 py-1 rounded text-sm font-mono text-red-800">{String(value)}</span>
            )
          },
          {
            key: 'winning_number',
            label: 'Winning Number',
            render: (value) => (
              <span className="bg-green-100 px-2 py-1 rounded text-sm font-mono text-green-800">{String(value)}</span>
            )
          },
          {
            key: 'amount',
            label: 'Lost Amount',
            render: (value) => <span className="text-sm font-bold text-red-600">₹{value}</span>
          },
          {
            key: 'created_at',
            label: 'Date',
            render: (value) => (
              <span className="text-sm text-gray-500">
                {new Date(String(value)).toLocaleDateString()}
              </span>
            )
          }
        ]}
        emptyMessage="No lost bets found"
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