'use client'
import { useState, useEffect } from 'react'
import { History, Search } from '@mui/icons-material'
import DataTable from '@/components/table/page'
import { ViewButton } from '@/components/action/page'
import Dropdown from '@/components/ui/dropdown/page'
import StatsCard from '../../users/StatsCard'

interface MessageHistory extends Record<string, unknown> {
  id: number
  title: string
  recipient: string
  status: string
  sent_date: string
  delivery_count: number
  type: string
  [key: string]: unknown
}

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'sent', label: 'Sent' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'failed', label: 'Failed' }
]

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'notification', label: 'Notification' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'alert', label: 'Alert' }
]

export default function MessageHistoryPage() {
  const [messages, setMessages] = useState<MessageHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    setMessages([
      { id: 1, title: 'Welcome Message', recipient: 'All Users', status: 'delivered', sent_date: '2024-01-15', delivery_count: 1234, type: 'notification' },
      { id: 2, title: 'Game Result Alert', recipient: 'Active Users', status: 'delivered', sent_date: '2024-01-15', delivery_count: 856, type: 'alert' },
      { id: 3, title: 'Maintenance Notice', recipient: 'All Users', status: 'sent', sent_date: '2024-01-14', delivery_count: 1180, type: 'announcement' },
      { id: 4, title: 'Winner Announcement', recipient: 'Specific User', status: 'failed', sent_date: '2024-01-14', delivery_count: 0, type: 'notification' }
    ])
    setLoading(false)
  }, [])

  const totalSent = messages.length
  const totalDelivered = messages.filter(m => m.status === 'delivered').length
  const totalFailed = messages.filter(m => m.status === 'failed').length
  const deliveryRate = totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 0

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <History className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Message History</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Sent"
          value={totalSent}
          icon={<History className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Delivered"
          value={totalDelivered}
          icon={<History className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Failed"
          value={totalFailed}
          icon={<History className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Delivery Rate"
          value={`${deliveryRate}%`}
          icon={<History className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            suppressHydrationWarning
          />
        </div>
        <div className="flex space-x-4">
          <Dropdown
            value={statusFilter}
            onChange={(value) => setStatusFilter(String(value))}
            options={statusOptions}
            placeholder="All Status"
          />
          <Dropdown
            value={typeFilter}
            onChange={(value) => setTypeFilter(String(value))}
            options={typeOptions}
            placeholder="All Types"
          />
        </div>
      </div>

      <DataTable<MessageHistory>
        data={messages.filter(msg => {
          const matchesSearch = searchTerm === '' || 
            msg.title?.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesStatus = !statusFilter || msg.status === statusFilter
          const matchesType = !typeFilter || msg.type === typeFilter
          return matchesSearch && matchesStatus && matchesType
        })}
        columns={[
          { key: 'title', label: 'Title' },
          {
            key: 'type',
            label: 'Type',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                value === 'notification' ? 'bg-blue-100 text-blue-800' :
                value === 'announcement' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {String(value)}
              </span>
            )
          },
          { key: 'recipient', label: 'Recipient' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                value === 'delivered' ? 'bg-green-100 text-green-800' :
                value === 'sent' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {String(value)}
              </span>
            )
          },
          { key: 'delivery_count', label: 'Delivered To' },
          {
            key: 'sent_date',
            label: 'Sent Date',
            render: (value) => new Date(String(value)).toLocaleDateString()
          }
        ]}
        emptyMessage="No message history found"
        loading={loading}
        actions={(message) => (
          <ViewButton size="small" onClick={() => console.log('View details', message.id)} />
        )}
      />
    </div>
  )
}