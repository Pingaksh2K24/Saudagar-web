'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, Search, FilterList, Login, Logout, AttachMoney } from '@mui/icons-material'
import Table from '../../../components/table/page'

interface ActivityLog extends Record<string, unknown> {
  id: number
  user_id: number
  user_name: string
  activity_type: 'login' | 'logout' | 'bet_placed' | 'withdrawal' | 'deposit'
  description: string
  amount?: number
  ip_address: string
  timestamp: string
  [key: string]: unknown
}

export default function UserActivityLogsPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    fetchActivityLogs()
  }, [])

  const fetchActivityLogs = async () => {
    try {
      // Mock data for now
      const mockData = [
        { id: 1, user_id: 101, user_name: 'John Doe', activity_type: 'login' as const, description: 'User logged in successfully', ip_address: '192.168.1.100', timestamp: '2024-01-03T10:30:00Z' },
        { id: 2, user_id: 102, user_name: 'Jane Smith', activity_type: 'bet_placed' as const, description: 'Placed bet on Mumbai Day - Single 5', amount: 500, ip_address: '192.168.1.101', timestamp: '2024-01-03T11:15:00Z' },
        { id: 3, user_id: 103, user_name: 'Mike Johnson', activity_type: 'deposit' as const, description: 'Wallet deposit via UPI', amount: 2000, ip_address: '192.168.1.102', timestamp: '2024-01-03T09:45:00Z' },
        { id: 4, user_id: 101, user_name: 'John Doe', activity_type: 'withdrawal' as const, description: 'Withdrawal request submitted', amount: 1500, ip_address: '192.168.1.100', timestamp: '2024-01-03T14:20:00Z' },
        { id: 5, user_id: 104, user_name: 'Sarah Davis', activity_type: 'login' as const, description: 'User logged in from mobile app', ip_address: '192.168.1.103', timestamp: '2024-01-03T08:30:00Z' },
        { id: 6, user_id: 102, user_name: 'Jane Smith', activity_type: 'bet_placed' as const, description: 'Placed bet on Delhi Night - Jodi 56', amount: 300, ip_address: '192.168.1.101', timestamp: '2024-01-03T16:45:00Z' },
        { id: 7, user_id: 105, user_name: 'Bob Wilson', activity_type: 'logout' as const, description: 'User logged out', ip_address: '192.168.1.104', timestamp: '2024-01-03T17:30:00Z' },
        { id: 8, user_id: 103, user_name: 'Mike Johnson', activity_type: 'bet_placed' as const, description: 'Placed bet on Gali Game - Panna 123', amount: 200, ip_address: '192.168.1.102', timestamp: '2024-01-03T12:00:00Z' },
        { id: 9, user_id: 106, user_name: 'Alice Brown', activity_type: 'deposit' as const, description: 'Wallet deposit via Bank Transfer', amount: 5000, ip_address: '192.168.1.105', timestamp: '2024-01-03T13:15:00Z' },
        { id: 10, user_id: 104, user_name: 'Sarah Davis', activity_type: 'withdrawal' as const, description: 'Withdrawal processed successfully', amount: 800, ip_address: '192.168.1.103', timestamp: '2024-01-03T15:45:00Z' }
      ]
      setActivities(mockData)
    } catch (error) {
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || activity.activity_type === filterType
    return matchesSearch && matchesFilter
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <Login className="w-4 h-4 text-green-500" />
      case 'logout': return <Logout className="w-4 h-4 text-red-500" />
      case 'bet_placed': return <AttachMoney className="w-4 h-4 text-blue-500" />
      case 'withdrawal': return <TrendingUp className="w-4 h-4 text-orange-500" />
      case 'deposit': return <TrendingUp className="w-4 h-4 text-green-500" />
      default: return <TrendingUp className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login': return 'bg-green-100 text-green-800'
      case 'logout': return 'bg-red-100 text-red-800'
      case 'bet_placed': return 'bg-blue-100 text-blue-800'
      case 'withdrawal': return 'bg-orange-100 text-orange-800'
      case 'deposit': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">User Activity Logs</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Activities</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="bet_placed">Bet Placed</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="deposit">Deposit</option>
          </select>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <Login className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Logins Today</p>
              <p className="text-xl font-bold">{activities.filter(a => a.activity_type === 'login').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-500">
          <div className="flex items-center">
            <Logout className="w-6 h-6 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Logouts Today</p>
              <p className="text-xl font-bold">{activities.filter(a => a.activity_type === 'logout').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <AttachMoney className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Bets Placed</p>
              <p className="text-xl font-bold">{activities.filter(a => a.activity_type === 'bet_placed').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-orange-500">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-orange-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Withdrawals</p>
              <p className="text-xl font-bold">{activities.filter(a => a.activity_type === 'withdrawal').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-600">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Deposits</p>
              <p className="text-xl font-bold">{activities.filter(a => a.activity_type === 'deposit').length}</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <Table
          columns={[
            {
              key: 'user',
              label: 'User',
              render: (_, activity) => (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{activity.user_name.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{String(activity.user_name)}</div>
                    <div className="text-sm text-gray-500">ID: {String(activity.user_id)}</div>
                  </div>
                </div>
              )
            },
            {
              key: 'activity_type',
              label: 'Activity',
              render: (type) => (
                <div className="flex items-center">
                  {getActivityIcon(String(type))}
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getActivityColor(String(type))}`}>
                    {String(type).replace('_', ' ')}
                  </span>
                </div>
              )
            },
            {
              key: 'description',
              label: 'Description',
              render: (description) => (
                <div className="text-sm text-gray-900">{String(description)}</div>
              )
            },
            {
              key: 'amount',
              label: 'Amount',
              render: (amount) => (
                <span className="text-sm text-gray-900">
                  {amount ? `₹${Number(amount).toLocaleString()}` : '-'}
                </span>
              )
            },
            {
              key: 'ip_address',
              label: 'IP Address',
              render: (ip) => (
                <span className="text-sm text-gray-500">{String(ip)}</span>
              )
            },
            {
              key: 'timestamp',
              label: 'Time',
              render: (timestamp) => (
                <span className="text-sm text-gray-500">
                  {new Date(String(timestamp)).toLocaleString()}
                </span>
              )
            }
          ]}
          data={filteredActivities}
          loading={loading}
          emptyMessage="No activity logs found"
        />
      )}
    </div>
  )
}