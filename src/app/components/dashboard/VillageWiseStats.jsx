'use client'
import { useState, useEffect } from 'react'

export default function VillageWiseStats() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  const villageStats = [
    { village: 'Rampur', agents: 8, bets: 145, collection: 45600, profit: 12300 },
    { village: 'Shivpur', agents: 6, bets: 98, collection: 32400, profit: 8900 },
    { village: 'Ganeshpur', agents: 7, bets: 112, collection: 38700, profit: 10200 },
    { village: 'Krishnapur', agents: 5, bets: 87, collection: 28900, profit: 7800 },
    { village: 'Hanumanpur', agents: 9, bets: 156, collection: 52300, profit: 14100 },
    { village: 'Laxmipur', agents: 4, bets: 67, collection: 22100, profit: 6200 }
  ]

  const totalAgents = villageStats.reduce((sum, v) => sum + v.agents, 0)
  const totalBets = villageStats.reduce((sum, v) => sum + v.bets, 0)
  const totalCollection = villageStats.reduce((sum, v) => sum + v.collection, 0)
  const totalProfit = villageStats.reduce((sum, v) => sum + v.profit, 0)
  const totalVillages = villageStats.length
  const avgCollection = totalCollection / totalVillages

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Village-wise Performance</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-sm text-orange-600 font-medium">Villages</p>
          <p className="text-xl font-bold text-orange-800">{totalVillages}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Agents</p>
          <p className="text-xl font-bold text-blue-800">{mounted ? totalAgents : 0}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Total Collection</p>
          <p className="text-xl font-bold text-green-800">{mounted ? `₹${Math.round(totalCollection/1000)}K` : '₹0'}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Avg/Village</p>
          <p className="text-xl font-bold text-purple-800">{mounted ? `₹${Math.round(avgCollection/1000)}K` : '₹0'}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Village</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Agents</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Bets</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Collection</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Profit</th>
            </tr>
          </thead>
          <tbody>
            {villageStats.map((village, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm font-medium text-gray-800">{village.village}</td>
                <td className="py-3 px-2 text-sm text-center text-gray-600">{village.agents}</td>
                <td className="py-3 px-2 text-sm text-center text-gray-600">{village.bets}</td>
                <td className="py-3 px-2 text-sm text-right font-semibold text-blue-600">₹{village.collection.toLocaleString()}</td>
                <td className="py-3 px-2 text-sm text-right font-semibold text-green-600">₹{village.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-sm font-semibold mb-3">
          <span className="text-gray-800">Total</span>
          <div className="flex space-x-8">
            <span className="text-gray-600">{mounted ? totalAgents : 0} Agents</span>
            <span className="text-gray-600">{mounted ? totalBets : 0} Bets</span>
            <span className="text-blue-600">{mounted ? `₹${totalCollection.toLocaleString()}` : '₹0'}</span>
            <span className="text-green-600">{mounted ? `₹${totalProfit.toLocaleString()}` : '₹0'}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 6 of 15 villages</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
            <span className="px-3 py-1 text-sm text-gray-600">2</span>
            <span className="px-3 py-1 text-sm text-gray-600">3</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}