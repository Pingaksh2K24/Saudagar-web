'use client'
import { useState } from 'react'
import { BarChart, TrendingUp, DateRange, AccountBalance } from '@mui/icons-material'
import StatsCard from '../../users/StatsCard'
import Dropdown from '../../../components/dropdown/page'

const periodOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
]

export default function RevenueChartPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily')

  const chartData = {
    daily: [
      { period: 'Mon', revenue: 15000, profit: 3000 },
      { period: 'Tue', revenue: 18000, profit: 4500 },
      { period: 'Wed', revenue: 12000, profit: 2000 },
      { period: 'Thu', revenue: 22000, profit: 6000 },
      { period: 'Fri', revenue: 25000, profit: 7500 },
      { period: 'Sat', revenue: 30000, profit: 9000 },
      { period: 'Sun', revenue: 20000, profit: 5000 }
    ]
  }

  const currentData = chartData.daily
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0)
  const totalProfit = currentData.reduce((sum, item) => sum + item.profit, 0)
  const avgRevenue = Math.round(totalRevenue / currentData.length)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Revenue Chart</h1>
        </div>
        <Dropdown
          value={selectedPeriod}
          onChange={(value) => setSelectedPeriod(String(value))}
          options={periodOptions}
          placeholder="Select Period"
          className="min-w-32"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Profit"
          value={`₹${totalProfit.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Average Revenue"
          value={`₹${avgRevenue.toLocaleString()}`}
          icon={<BarChart className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Profit Margin"
          value={`${Math.round((totalProfit / totalRevenue) * 100)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-indigo-500 to-indigo-600"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <BarChart className="w-5 h-5 mr-2" />
          Revenue & Profit Chart
        </h2>
        
        <div className="space-y-4">
          {currentData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{item.period}</span>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">Revenue: ₹{item.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Profit: ₹{item.profit.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(item.revenue / 30000) * 100}%` }}
                  ></div>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(item.profit / 9000) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Profit</span>
          </div>
        </div>
      </div>
    </div>
  )
}