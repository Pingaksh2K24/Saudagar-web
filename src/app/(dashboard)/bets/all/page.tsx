'use client'
import { useState, useEffect } from 'react'
import { AttachMoney, Search } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { ViewButton } from '../../../components/action/page'
import StatsCard from '../../users/StatsCard'
import Dropdown from '../../../components/dropdown/page'
import BetDetailsModal from '../BetDetailsModal'
import React from 'react'
import { getUserSession } from '@/utils/cookies'

interface Bet extends Record<string, unknown> {
  id: number
  user_name: string
  game_name: string
  bet_type: string
  bet_number: string
  amount: number
  status: 'pending' | 'won' | 'lost'
  created_at: string
  [key: string]: unknown
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
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedGame, setSelectedGame] = useState('')
  const [paginationInfo, setPaginationInfo] = useState({
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 10,
    total: 0,
    total_pages: 1
  })

  useEffect(() => {
    fetchBets()
  }, [currentPage, activeFilters, selectedDate, selectedGame])

  const fetchBets = async () => {
    try {
      setLoading(true)
      const session = getUserSession()
      const token = localStorage.getItem('token')
      const response = await fetch('https://saudagar-backend.onrender.com/api/bids/fetch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pagination: {
            page: currentPage,
            limit: 10
          },
          filters: {
            date: null,
            game_id: null,
            session_type: null,
            status: null,
            bid_type: null,
            user_id: undefined
          }
        })
      })
      const resp = await response.json()
      console.log('Fetched bets data listttttt :', resp)
      setBets(Array.isArray(resp.data.bids) ? resp.data.bids : [])
      setPaginationInfo(resp.data.pagination || {
        current_page: 1,
        has_next: false,
        has_prev: false,
        per_page: 10,
        total: 0,
        total_pages: 1
      })
    } catch (error) {
      console.error('Error fetching bets:', error)
      setBets([])
    } finally {
      setLoading(false)
    }
  }

  const nextPage = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('https://saudagar-backend.onrender.com/api/bids/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        pagination: {
          page: currentPage + 1,
          limit: 10
        },
        filters: {
          date: selectedDate,
          game_id: selectedGame ? parseInt(selectedGame) : undefined,
          status: activeFilters.status
        }
      })
    })
    const data = await response.json()
    if (data.bets && data.bets.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

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
          value={paginationInfo.total}
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
            suppressHydrationWarning
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
            key: 'full_name',
            label: 'Agent',
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
            key: 'session_type',
            label: 'Session',
            render: (value) => (
              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{String(value)}</span>
            )
          },
          {
            key: 'bid_type',
            label: 'Type',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${value === 'single' ? 'bg-blue-100 text-blue-800' :
                value === 'jodi' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                {String(value)}
              </span>
            )
          },
          {
            key: 'bid_number',
            label: 'Number',
            render: (value) => (
              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{String(value)}</span>
            )
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (value) => <span className="text-sm font-medium">₹{String(value)}</span>
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${value === 'won' ? 'bg-green-100 text-green-800' :
                value === 'lost' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                {String(value)}
              </span>
            )
          },
          {
            key: 'bid_date',
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
        pagination={paginationInfo}
        onPageChange={(page) => setCurrentPage(page)}
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