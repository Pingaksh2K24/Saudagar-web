'use client'
import { useState, useEffect } from 'react'
import { List, SportsEsports, Search } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { ViewButton, EditButton } from '../../../components/action/page'
import Dropdown from '../../../components/dropdown/page'

interface Result extends Record<string, unknown> {
  id: number
  game_name: string
  result_number: string
  date: string
  status: string
  [key: string]: unknown
}

const gameOptions = [
  { value: '', label: 'All Games' },
  { value: 'mumbai-day', label: 'Mumbai Day' },
  { value: 'delhi-night', label: 'Delhi Night' },
  { value: 'gali-game', label: 'Gali Game' }
]

export default function ViewResultsPage() {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGame, setSelectedGame] = useState('')

  useEffect(() => {
    // Mock data
    setResults([
      { id: 1, game_name: 'Mumbai Day', result_number: '123', date: '2024-01-15', status: 'declared' },
      { id: 2, game_name: 'Delhi Night', result_number: '456', date: '2024-01-15', status: 'declared' },
      { id: 3, game_name: 'Gali Game', result_number: '789', date: '2024-01-14', status: 'declared' }
    ])
    setLoading(false)
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <List className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">View All Results</h1>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
        <Dropdown
          value={selectedGame}
          onChange={(value) => setSelectedGame(String(value))}
          options={gameOptions}
          placeholder="All Games"
          className="min-w-32"
        />
      </div>

      <DataTable<Result>
        data={results.filter(result => {
          const matchesSearch = searchTerm === '' || 
            result.game_name?.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesGame = !selectedGame || result.game_name.toLowerCase().includes(selectedGame)
          return matchesSearch && matchesGame
        })}
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
          { key: 'result_number', label: 'Result Number' },
          {
            key: 'date',
            label: 'Date',
            render: (value) => new Date(String(value)).toLocaleDateString()
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {String(value)}
              </span>
            )
          }
        ]}
        emptyMessage="No results found"
        loading={loading}
        actions={(result) => (
          <div className="flex items-center space-x-2">
            <ViewButton size="small" onClick={() => console.log('View', result.id)} />
            <EditButton size="small" onClick={() => console.log('Edit', result.id)} />
          </div>
        )}
      />
    </div>
  )
}