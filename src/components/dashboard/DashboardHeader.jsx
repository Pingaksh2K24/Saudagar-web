'use client'
import { useState, useEffect } from 'react'

export default function DashboardHeader({ onAddAgent }) {
  const [currentTime, setCurrentTime] = useState('')
  
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Saudagar Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your agents, bids, and games across all villages</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Time</p>
            <p className="text-lg font-semibold text-gray-800">{currentTime || '--:--:--'}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => window.location.href = '/results/declare'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Declare Result
            </button>
            <button 
              onClick={onAddAgent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}