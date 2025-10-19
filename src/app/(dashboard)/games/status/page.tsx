'use client'
import { useState, useEffect } from 'react'
import { BarChart, SportsEsports, TrendingUp, TrendingDown, Pause } from '@mui/icons-material'
import StatsCard from '../../users/StatsCard'

interface GameStatus {
  id: number
  name: string
  status: 'running' | 'paused' | 'closed'
  current_bets: number
  total_amount: number
  last_result: string
  next_draw: string
}

export default function GameStatusPage() {
  const [gameStatuses, setGameStatuses] = useState<GameStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now
    setGameStatuses([
      { id: 1, name: 'Mumbai Day', status: 'running', current_bets: 150, total_amount: 45000, last_result: '567', next_draw: '12:00 PM' },
      { id: 2, name: 'Delhi Night', status: 'paused', current_bets: 89, total_amount: 23000, last_result: '234', next_draw: '08:00 PM' },
      { id: 3, name: 'Gali Game', status: 'closed', current_bets: 0, total_amount: 0, last_result: '890', next_draw: '10:00 AM' }
    ])
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <TrendingUp className="w-4 h-4" />
      case 'paused': return <Pause className="w-4 h-4" />
      case 'closed': return <TrendingDown className="w-4 h-4" />
      default: return <BarChart className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <BarChart className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Game Status</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Running Games"
          value={gameStatuses.filter(g => g.status === 'running').length}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Paused Games"
          value={gameStatuses.filter(g => g.status === 'paused').length}
          icon={<Pause className="w-6 h-6" />}
          gradient="from-yellow-500 to-yellow-600"
        />
        <StatsCard
          title="Closed Games"
          value={gameStatuses.filter(g => g.status === 'closed').length}
          icon={<TrendingDown className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Total Bets"
          value={gameStatuses.reduce((sum, g) => sum + g.current_bets, 0)}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
      </div>

      {/* Game Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameStatuses.map((game) => (
          <div key={game.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center ${getStatusColor(game.status)}`}>
                {getStatusIcon(game.status)}
                <span className="ml-1 capitalize">{game.status}</span>
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Bets:</span>
                <span className="text-sm font-medium">{game.current_bets}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="text-sm font-medium">₹{game.total_amount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Result:</span>
                <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{game.last_result}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Draw:</span>
                <span className="text-sm font-medium text-red-600">{game.next_draw}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                {game.status === 'running' && (
                  <button className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded text-xs hover:bg-yellow-600">
                    Pause Game
                  </button>
                )}
                {game.status === 'paused' && (
                  <button className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-xs hover:bg-green-600">
                    Resume Game
                  </button>
                )}
                {game.status === 'closed' && (
                  <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-xs hover:bg-blue-600">
                    Start Game
                  </button>
                )}
                <button className="flex-1 bg-gray-500 text-white px-3 py-2 rounded text-xs hover:bg-gray-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}