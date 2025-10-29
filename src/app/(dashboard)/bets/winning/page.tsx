'use client'
import { useState, useEffect } from 'react'
import { EmojiEventsOutlined, Search } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { ViewButton } from '../../../components/action/page'
import StatsCard from '../../users/StatsCard'

interface WinningBet extends Record<string, unknown> {
  id: number
  user_name: string
  game_name: string
  bet_type: string
  bet_number: string
  bet_amount: number
  win_amount: number
  multiplier: number
  created_at: string
  [key: string]: unknown
}

export default function WinningBetsPage() {
  const [winningBets, setWinningBets] = useState<WinningBet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data
    setWinningBets([
      { id: 1, user_name: 'John Doe', game_name: 'Mumbai Day', bet_type: 'single', bet_number: '5', bet_amount: 100, win_amount: 900, multiplier: 9, created_at: '2024-01-01' },
      { id: 2, user_name: 'Alice Brown', game_name: 'Delhi Night', bet_type: 'jodi', bet_number: '56', bet_amount: 200, win_amount: 18000, multiplier: 90, created_at: '2024-01-02' }
    ])
    setLoading(false)
  }, [])

  const totalWinAmount = winningBets.reduce((sum, bet) => sum + bet.win_amount, 0)
  const totalBetAmount = winningBets.reduce((sum, bet) => sum + bet.bet_amount, 0)

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <EmojiEventsOutlined className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Winning Bets</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Winning Bets"
          value={winningBets.length}
          icon={<EmojiEventsOutlined className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Bet Amount"
          value={`₹${totalBetAmount.toLocaleString()}`}
          icon={<EmojiEventsOutlined className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Win Amount"
          value={`₹${totalWinAmount.toLocaleString()}`}
          icon={<EmojiEventsOutlined className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Net Loss"
          value={`₹${(totalWinAmount - totalBetAmount).toLocaleString()}`}
          icon={<EmojiEventsOutlined className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search winning bets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <DataTable<WinningBet>
        data={winningBets.filter(bet => {
          const matchesSearch = searchTerm === '' || 
            bet.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bet.game_name?.toLowerCase().includes(searchTerm.toLowerCase())
          return matchesSearch
        })}
        columns={[
          {
            key: 'user_name',
            label: 'Winner',
            sortable: true,
            render: (value, bet) => (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <EmojiEventsOutlined className="w-5 h-5 text-white" />
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
            label: 'Winning Number',
            render: (value) => (
              <span className="bg-green-100 px-2 py-1 rounded text-sm font-mono text-green-800">{String(value)}</span>
            )
          },
          {
            key: 'bet_amount',
            label: 'Bet Amount',
            render: (value) => <span className="text-sm">₹{String(value)}</span>
          },
          {
            key: 'win_amount',
            label: 'Win Amount',
            render: (value) => <span className="text-sm font-bold text-green-600">₹{String(value)}</span>
          },
          {
            key: 'multiplier',
            label: 'Multiplier',
            render: (value) => <span className="text-sm font-medium">{String(value)}x</span>
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
        emptyMessage="No winning bets found"
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