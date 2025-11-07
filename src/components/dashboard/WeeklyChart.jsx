'use client'
import { useState, useEffect } from 'react'

export default function WeeklyChart() {
  const [mounted, setMounted] = useState(false)
  
  const weekData = [
    { day: 'Mon', collection: 45000, profit: 12000 },
    { day: 'Tue', collection: 52000, profit: 14500 },
    { day: 'Wed', collection: 38000, profit: 10200 },
    { day: 'Thu', collection: 61000, profit: 16800 },
    { day: 'Fri', collection: 48000, profit: 13100 },
    { day: 'Sat', collection: 72000, profit: 19500 },
    { day: 'Sun', collection: 55000, profit: 15200 }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const maxCollection = Math.max(...weekData.map(d => d.collection))
  const totalCollection = weekData.reduce((sum, d) => sum + d.collection, 0)
  const totalProfit = weekData.reduce((sum, d) => sum + d.profit, 0)

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Performance</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Collection</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Profit</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-40 space-x-2">
        {weekData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div className="w-full flex flex-col items-center space-y-1">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(data.collection / maxCollection) * 120}px` }}
              ></div>
              <div 
                className="w-full bg-green-500 rounded-t"
                style={{ height: `${(data.profit / maxCollection) * 120}px` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-600">{data.day}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {mounted ? `₹${totalCollection.toLocaleString()}` : '₹0'}
            </p>
            <p className="text-sm text-gray-600">Total Collection</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {mounted ? `₹${totalProfit.toLocaleString()}` : '₹0'}
            </p>
            <p className="text-sm text-gray-600">Total Profit</p>
          </div>
        </div>
      </div>
    </div>
  )
}