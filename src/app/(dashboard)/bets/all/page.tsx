'use client'
import { useState, useEffect } from 'react'
import { AttachMoney, Search } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { ViewButton } from '../../../components/action/page'
import StatsCard from '../../users/StatsCard'
import Dropdown from '../../../components/dropdown/page'
import BetDetailsModal from '../BetDetailsModal'

interface Bet {
  id: number
  user_name: string
  game_name: string
  bet_type: string
  bet_number: string
  amount: number
  status: 'pending' | 'won' | 'lost'
  created_at: string
}

const betTypeOptions = [
  { value: 'single', label: 'Single' },
  { value: 'jodi', label: 'Jodi' },
  { value: 'panna', label: 'Panna' }
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' }
]

export default function AllBetsPage() {
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBet, setSelectedBet] = useState(null)

  useEffect(() => {
    // Mock data
    setBets([
      { id: 1, user_name: 'John Doe', game_name: 'Mumbai Day', bet_type: 'single', bet_number: '5', amount: 100, status: 'won', created_at: '2024-01-01' },
      { id: 2, user_name: 'Jane Smith', game_name: 'Delhi Night', bet_type: 'jodi', bet_number: '56', amount: 500, status: 'lost', created_at: '2024-01-02' },
      { id: 3, user_name: 'Mike Johnson', game_name: 'Gali Game', bet_type: 'panna', bet_number: '567', amount: 200, status: 'pending', created_at: '2024-01-03' }
    ])
    setLoading(false)
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <AttachMoney className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">All Bets</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Bets"
          value={bets.length}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Winning Bets"
          value={bets.filter(b => b.status === 'won').length}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Lost Bets"
          value={bets.filter(b => b.status === 'lost').length}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Pending Bets"
          value={bets.filter(b => b.status === 'pending').length}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-yellow-500 to-yellow-600"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Dropdown
            value={activeFilters.bet_type || ''}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, bet_type: String(value) }))}
            options={betTypeOptions}
            placeholder="All Types"
            className="min-w-32"
          />
          <Dropdown
            value={activeFilters.status || ''}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, status: String(value) }))}
            options={statusOptions}
            placeholder="All Status"
            className="min-w-32"
          />
        </div>
      </div>

      <DataTable<Bet>
        data={bets.filter(bet => {
          const matchesSearch = searchTerm === '' || 
            bet.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bet.game_name?.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesType = !activeFilters.bet_type || bet.bet_type === activeFilters.bet_type
          const matchesStatus = !activeFilters.status || bet.status === activeFilters.status
          return matchesSearch && matchesType && matchesStatus
        })}
        columns={[
          {
            key: 'user_name',
            label: 'User',
            sortable: true,
            render: (value, bet) => (
              <div>
                <div className="text-sm font-medium text-gray-900">{String(value)}</div>
                <div className="text-sm text-gray-500">ID: {bet.id}</div>
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
              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{String(value)}</span>
            )
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (value) => <span className="text-sm font-medium">₹{value}</span>
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                value === 'won' ? 'bg-green-100 text-green-800' :
                value === 'lost' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {String(value)}
              </span>
            )
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
        emptyMessage="No bets found"
        loading={loading}
        actions={(bet) => (
          <div className="flex items-center justify-end">
            <ViewButton size="small" onClick={() => {
              setSelectedBet(bet)
              setIsModalOpen(true)
            }} />
          </div>
        )}
      />
      
      <BetDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bet={selectedBet}
      />
    </div>
  )
}