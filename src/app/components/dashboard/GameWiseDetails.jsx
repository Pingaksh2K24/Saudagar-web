'use client'
import { useState, useEffect } from 'react'

export default function GameWiseDetails() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  const gameDetails = [
    {
      game: 'Milan Day',
      openTime: '10:00 AM',
      closeTime: '3:30 PM',
      status: 'open',
      totalBets: 234,
      totalAmount: 45600,
      commission: 4560,
      potentialPayout: 41040,
      profit: 4560,
      topNumber: '234',
      topNumberBets: 45
    },
    {
      game: 'Kalyan',
      openTime: '9:15 PM',
      closeTime: '11:30 PM',
      status: 'closed',
      result: '567',
      totalBets: 189,
      totalAmount: 38900,
      commission: 3890,
      actualPayout: 12500,
      profit: 26400,
      topNumber: '567',
      topNumberBets: 38
    },
    {
      game: 'Main Bazar',
      openTime: '8:00 PM',
      closeTime: '9:30 PM',
      status: 'open',
      totalBets: 156,
      totalAmount: 32100,
      commission: 3210,
      potentialPayout: 28890,
      profit: 3210,
      topNumber: '890',
      topNumberBets: 32
    },
    {
      game: 'Milan Night',
      openTime: '8:30 PM',
      closeTime: '11:00 PM',
      status: 'result-pending',
      totalBets: 98,
      totalAmount: 19800,
      commission: 1980,
      potentialPayout: 17820,
      profit: 1980,
      topNumber: '123',
      topNumberBets: 28
    }
  ]

  const getStatusBadge = (status) => {
    const styles = {
      'open': 'bg-green-100 text-green-800',
      'closed': 'bg-red-100 text-red-800',
      'result-pending': 'bg-yellow-100 text-yellow-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const totalBets = gameDetails.reduce((sum, g) => sum + g.totalBets, 0)
  const totalAmount = gameDetails.reduce((sum, g) => sum + g.totalAmount, 0)
  const totalCommission = gameDetails.reduce((sum, g) => sum + g.commission, 0)
  const totalProfit = gameDetails.reduce((sum, g) => sum + g.profit, 0)

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Game-wise Details</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Refresh Data
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600">Game</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">Status</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">Time</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">Bets</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Amount</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Commission</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">Top Number</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Profit</th>
            </tr>
          </thead>
          <tbody>
            {gameDetails.map((game, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 font-semibold text-gray-800">{game.game}</td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(game.status)}`}>
                    {game.status.replace('-', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-2 text-center text-gray-600">
                  <div className="text-xs">
                    <div>{game.openTime}</div>
                    <div>{game.closeTime}</div>
                  </div>
                </td>
                <td className="py-3 px-2 text-center font-medium text-gray-800">{game.totalBets}</td>
                <td className="py-3 px-2 text-right font-semibold text-blue-600">₹{game.totalAmount.toLocaleString()}</td>
                <td className="py-3 px-2 text-right font-medium text-purple-600">₹{game.commission.toLocaleString()}</td>
                <td className="py-3 px-2 text-center">
                  <div className="text-xs">
                    <div className="font-mono font-bold text-orange-600">{game.topNumber}</div>
                    <div className="text-gray-500">({game.topNumberBets} bets)</div>
                  </div>
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-600">₹{game.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-800">{mounted ? totalBets : 0}</p>
            <p className="text-xs text-gray-600">Total Bets</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600">{mounted ? `₹${totalAmount.toLocaleString()}` : '₹0'}</p>
            <p className="text-xs text-gray-600">Total Amount</p>
          </div>
          <div>
            <p className="text-lg font-bold text-purple-600">{mounted ? `₹${totalCommission.toLocaleString()}` : '₹0'}</p>
            <p className="text-xs text-gray-600">Total Commission</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">{mounted ? `₹${totalProfit.toLocaleString()}` : '₹0'}</p>
            <p className="text-xs text-gray-600">Total Profit</p>
          </div>
        </div>
      </div>
    </div>
  )
}