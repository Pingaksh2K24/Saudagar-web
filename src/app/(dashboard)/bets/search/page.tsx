'use client'
import { useState } from 'react'
import { Search, FilterList } from '@mui/icons-material'
import DataTable from '@/components/table/page'
import { ViewButton } from '@/components/action/page'
import Dropdown from '@/components/ui/dropdown/page'
import Button from '@/components/ui/button/page'

interface SearchResult extends Record<string, unknown> {
  id: number
  user_name: string
  game_name: string
  bet_type: string
  bet_number: string
  amount: number
  status: string
  created_at: string
  [key: string]: unknown
}

const gameOptions = [
  { value: 'mumbai-day', label: 'Mumbai Day' },
  { value: 'delhi-night', label: 'Delhi Night' },
  { value: 'gali-game', label: 'Gali Game' }
]

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

export default function SearchBetsPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    user_name: '',
    game: '',
    bet_type: '',
    status: '',
    bet_number: '',
    date_from: '',
    date_to: '',
    amount_min: '',
    amount_max: ''
  })

  const handleSearch = () => {
    setLoading(true)
    // Mock search results
    setTimeout(() => {
      setSearchResults([
        { id: 1, user_name: 'John Doe', game_name: 'Mumbai Day', bet_type: 'single', bet_number: '5', amount: 100, status: 'won', created_at: '2024-01-01' },
        { id: 2, user_name: 'Jane Smith', game_name: 'Delhi Night', bet_type: 'jodi', bet_number: '56', amount: 500, status: 'lost', created_at: '2024-01-02' }
      ])
      setLoading(false)
    }, 1000)
  }

  const clearFilters = () => {
    setFilters({
      user_name: '',
      game: '',
      bet_type: '',
      status: '',
      bet_number: '',
      date_from: '',
      date_to: '',
      amount_min: '',
      amount_max: ''
    })
    setSearchResults([])
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Search className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Search & Filter Bets</h1>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <FilterList className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Search Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
            <input
              type="text"
              placeholder="Enter user name"
              value={filters.user_name}
              onChange={(e) => setFilters(prev => ({ ...prev, user_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Game</label>
            <Dropdown
              value={filters.game}
              onChange={(value) => setFilters(prev => ({ ...prev, game: String(value) }))}
              options={gameOptions}
              placeholder="Select game"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bet Type</label>
            <Dropdown
              value={filters.bet_type}
              onChange={(value) => setFilters(prev => ({ ...prev, bet_type: String(value) }))}
              options={betTypeOptions}
              placeholder="Select bet type"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Dropdown
              value={filters.status}
              onChange={(value) => setFilters(prev => ({ ...prev, status: String(value) }))}
              options={statusOptions}
              placeholder="Select status"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bet Number</label>
            <input
              type="text"
              placeholder="Enter bet number"
              value={filters.bet_number}
              onChange={(e) => setFilters(prev => ({ ...prev, bet_number: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount</label>
            <input
              type="number"
              placeholder="Min amount"
              value={filters.amount_min}
              onChange={(e) => setFilters(prev => ({ ...prev, amount_min: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Amount</label>
            <input
              type="number"
              placeholder="Max amount"
              value={filters.amount_max}
              onChange={(e) => setFilters(prev => ({ ...prev, amount_max: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button
            caption="Search Bets"
            variant="primary"
            icon={<Search />}
            onClick={handleSearch}
            loading={loading}
          />
          <Button
            caption="Clear Filters"
            variant="outline"
            onClick={clearFilters}
          />
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results ({searchResults.length} bets found)
            </h3>
          </div>
          
          <div className="p-4">
            <DataTable<SearchResult>
              data={searchResults}
              columns={[
                {
                  key: 'user_name',
                  label: 'User',
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
                  render: (value) => <span className="text-sm font-medium">₹{String(value)}</span>
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
              emptyMessage="No search results"
              loading={false}
              actions={(bet) => (
                <div className="flex items-center justify-end">
                  <ViewButton size="small" onClick={() => console.log('View', bet.id)} />
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}