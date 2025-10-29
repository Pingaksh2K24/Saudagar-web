'use client'
import { useState, useEffect } from 'react'
import { AccountBalanceWallet, Search, TrendingUp, TrendingDown } from '@mui/icons-material'
import Table from '../../../components/table/page'

interface WalletData extends Record<string, unknown> {
  user_id: number
  user_name: string
  balance: number
  total_deposits: number
  total_withdrawals: number
  pending_withdrawals: number
  last_transaction: string
  [key: string]: unknown
}

export default function WalletDetailsPage() {
  const [walletData, setWalletData] = useState<WalletData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      const response = await fetch('https://saudagar-backend.onrender.com/api/users/wallet')
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          setWalletData(Array.isArray(data) ? data : data.wallets || [])
        } else {
          setWalletData([])
        }
      } else {
        setWalletData([])
      }
    } catch (error) {
      setWalletData([])
    } finally {
      setLoading(false)
    }
  }

  const filteredData = walletData.filter(wallet =>
    wallet.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AccountBalanceWallet className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Wallet Details</h1>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Balance</p>
              <p className="text-2xl font-bold">₹{walletData.reduce((sum, w) => sum + w.balance, 0).toLocaleString()}</p>
            </div>
            <AccountBalanceWallet className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Deposits</p>
              <p className="text-2xl font-bold">₹{walletData.reduce((sum, w) => sum + w.total_deposits, 0).toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Withdrawals</p>
              <p className="text-2xl font-bold">₹{walletData.reduce((sum, w) => sum + w.total_withdrawals, 0).toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Pending Withdrawals</p>
              <p className="text-2xl font-bold">₹{walletData.reduce((sum, w) => sum + w.pending_withdrawals, 0).toLocaleString()}</p>
            </div>
            <AccountBalanceWallet className="w-8 h-8 text-red-200" />
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
              render: (_, wallet) => (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{String(wallet.user_name).charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{String(wallet.user_name)}</div>
                    <div className="text-sm text-gray-500">ID: {String(wallet.user_id)}</div>
                  </div>
                </div>
              )
            },
            {
              key: 'balance',
              label: 'Balance',
              render: (balance) => (
                <span className="text-lg font-semibold text-green-600">₹{Number(balance).toLocaleString()}</span>
              )
            },
            {
              key: 'total_deposits',
              label: 'Deposits',
              render: (deposits) => (
                <span className="text-sm text-gray-900">₹{Number(deposits).toLocaleString()}</span>
              )
            },
            {
              key: 'total_withdrawals',
              label: 'Withdrawals',
              render: (withdrawals) => (
                <span className="text-sm text-gray-900">₹{Number(withdrawals).toLocaleString()}</span>
              )
            },
            {
              key: 'pending_withdrawals',
              label: 'Pending',
              render: (pending) => (
                <span className="text-sm font-medium text-orange-600">₹{Number(pending).toLocaleString()}</span>
              )
            },
            {
              key: 'last_transaction',
              label: 'Last Transaction',
              render: (date) => (
                <span className="text-sm text-gray-500">
                  {new Date(String(date)).toLocaleDateString()}
                </span>
              )
            },
            {
              key: 'actions',
              label: 'Actions',
              render: () => (
                <div className="text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900 mr-3">View History</button>
                  <button className="text-blue-600 hover:text-blue-900">Adjust</button>
                </div>
              )
            }
          ]}
          data={filteredData}
          loading={loading}
          emptyMessage="No wallet data found"
        />
      )}
    </div>
  )
}