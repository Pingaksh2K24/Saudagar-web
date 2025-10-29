'use client'
import { useState } from 'react'
import { Receipt, DateRange, Download, TrendingUp, TrendingDown } from '@mui/icons-material'
import Button from '../../../components/button/page'
import Dropdown from '../../../components/dropdown/page'
import StatsCard from '../../users/StatsCard'

const reportTypeOptions = [
  { value: 'daily', label: 'Daily Report' },
  { value: 'weekly', label: 'Weekly Report' },
  { value: 'monthly', label: 'Monthly Report' },
  { value: 'custom', label: 'Custom Range' }
]

const formatOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
  { value: 'csv', label: 'CSV' }
]

export default function TransactionReportsPage() {
  const [reportType, setReportType] = useState('')
  const [format, setFormat] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleGenerateReport = () => {
    console.log('Generating report:', { reportType, format, startDate, endDate })
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Receipt className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Transaction Reports</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Deposits"
          value="₹1,25,000"
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Withdrawals"
          value="₹85,000"
          icon={<TrendingDown className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Net Revenue"
          value="₹40,000"
          icon={<Receipt className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Pending Requests"
          value="12"
          icon={<Receipt className="w-6 h-6" />}
          gradient="from-yellow-500 to-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <DateRange className="w-5 h-5 mr-2" />
            Generate Report
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <Dropdown
                value={reportType}
                onChange={(value) => setReportType(String(value))}
                options={reportTypeOptions}
                placeholder="Select Report Type"
              />
            </div>

            {reportType === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <Dropdown
                value={format}
                onChange={(value) => setFormat(String(value))}
                options={formatOptions}
                placeholder="Select Format"
              />
            </div>

            <Button
              caption="Generate & Download"
              variant="primary"
              icon={<Download />}
              onClick={handleGenerateReport}
              disabled={!reportType || !format}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Today&apos;s Deposits</span>
              <span className="font-medium text-green-600">₹15,000</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Today&apos;s Withdrawals</span>
              <span className="font-medium text-red-600">₹8,500</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Pending Deposits</span>
              <span className="font-medium text-yellow-600">5</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Pending Withdrawals</span>
              <span className="font-medium text-yellow-600">7</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span className="text-sm text-gray-600">Net Profit Today</span>
              <span className="font-medium text-blue-600">₹6,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}