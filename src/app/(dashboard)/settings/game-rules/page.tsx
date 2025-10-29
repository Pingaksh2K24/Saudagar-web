'use client'
import { useState } from 'react'
import { Rule, Save, SportsEsports } from '@mui/icons-material'
import Button from '../../../components/button/page'
import Dropdown from '../../../components/dropdown/page'

const gameOptions = [
  { value: 'single', label: 'Single' },
  { value: 'jodi', label: 'Jodi' },
  { value: 'panna', label: 'Panna' }
]

export default function GameRulesPage() {
  const [selectedGame, setSelectedGame] = useState('')
  const [minBet, setMinBet] = useState('10')
  const [maxBet, setMaxBet] = useState('10000')
  const [payout, setPayout] = useState('9.5')
  const [commission, setCommission] = useState('5')

  const handleSave = () => {
    console.log('Saving game rules:', { selectedGame, minBet, maxBet, payout, commission })
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Rule className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Game Rules & Payout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <SportsEsports className="w-5 h-5 mr-2" />
            Game Configuration
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Game Type</label>
              <Dropdown
                value={selectedGame}
                onChange={(value) => setSelectedGame(String(value))}
                options={gameOptions}
                placeholder="Select Game Type"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Bet Amount</label>
                <input
                  type="number"
                  value={minBet}
                  onChange={(e) => setMinBet(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Bet Amount</label>
                <input
                  type="number"
                  value={maxBet}
                  onChange={(e) => setMaxBet(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payout Rate (x)</label>
                <input
                  type="number"
                  step="0.1"
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commission (%)</label>
                <input
                  type="number"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <Button
              caption="Save Rules"
              variant="primary"
              icon={<Save />}
              onClick={handleSave}
              disabled={!selectedGame}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Current Rules</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Single Game</h3>
              <div className="text-sm text-gray-600 mt-2">
                <p>Min Bet: ₹10 | Max Bet: ₹10,000</p>
                <p>Payout: 9.5x | Commission: 5%</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Jodi Game</h3>
              <div className="text-sm text-gray-600 mt-2">
                <p>Min Bet: ₹10 | Max Bet: ₹5,000</p>
                <p>Payout: 95x | Commission: 5%</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Panna Game</h3>
              <div className="text-sm text-gray-600 mt-2">
                <p>Min Bet: ₹10 | Max Bet: ₹2,000</p>
                <p>Payout: 142x | Commission: 5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}