'use client'
import { useState } from 'react'
import { DateRange, Save, SportsEsports } from '@mui/icons-material'
import Button from '../../../components/button/page'
import Dropdown from '../../../components/dropdown/page'

const gameOptions = [
  { value: 'mumbai-day', label: 'Mumbai Day' },
  { value: 'delhi-night', label: 'Delhi Night' },
  { value: 'gali-game', label: 'Gali Game' }
]

export default function DeclareResultPage() {
  const [selectedGame, setSelectedGame] = useState('')
  const [openResult, setOpenResult] = useState('')
  const [winningNumber, setWinningNumber] = useState('')
  const [closeResult, setCloseResult] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleDeclareResult = () => {
    console.log('Declaring result:', { selectedGame, openResult, winningNumber, closeResult, date })
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <DateRange className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Declare Result</h1>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <DateRange className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Declare Game Result</h2>
              <p className="text-red-100 text-sm">Enter the winning numbers for today's game</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <label className="block text-sm font-semibold text-blue-800 mb-3">Select Game</label>
            <Dropdown
              value={selectedGame}
              onChange={setSelectedGame}
              options={gameOptions}
              placeholder="Choose Game"
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4 text-center">Result Numbers</h3>
            <div className="flex items-end justify-center gap-6">
              <div className="text-center">
                <label className="block text-sm font-semibold text-green-700 mb-3">Open Result</label>
                <input
                  type="text"
                  value={openResult}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 3)
                    setOpenResult(value)
                  }}
                  className="w-20 h-16 text-2xl font-bold text-center border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 bg-white shadow-lg"
                  placeholder="XXX"
                  maxLength="3"
                  suppressHydrationWarning
                />
              </div>
              <div className="text-3xl font-bold text-green-600 pb-4">-</div>
              <div className="text-center">
                <label className="block text-sm font-semibold text-green-700 mb-3">Winning Number</label>
                <input
                  type="text"
                  value={winningNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 2)
                    setWinningNumber(value)
                  }}
                  className="w-16 h-16 text-2xl font-bold text-center border-2 border-yellow-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 bg-white shadow-lg"
                  placeholder="XX"
                  maxLength="2"
                  suppressHydrationWarning
                />
              </div>
              <div className="text-3xl font-bold text-green-600 pb-4">-</div>
              <div className="text-center">
                <label className="block text-sm font-semibold text-green-700 mb-3">Close Result</label>
                <input
                  type="text"
                  value={closeResult}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 3)
                    setCloseResult(value)
                  }}
                  className="w-20 h-16 text-2xl font-bold text-center border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 bg-white shadow-lg"
                  placeholder="XXX"
                  maxLength="3"
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <label className="block text-sm font-semibold text-purple-800 mb-3">Result Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 bg-white"
              suppressHydrationWarning
            />
          </div>

          <div className="pt-4">
            <Button
              caption="Declare Result"
              variant="primary"
              icon={<Save />}
              onClick={handleDeclareResult}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}