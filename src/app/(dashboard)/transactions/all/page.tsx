'use client'
import { useState, useEffect } from 'react'
import { CreditCard, Search, FilterList, TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { ViewButton } from '../../../components/action/page'
import Dropdown from '../../../components/dropdown/page'
import StatsCard from '../../users/StatsCard'

interface Transaction {
  id: number
  user_name: string
  type: string
  amount: number
  status: string
  date: string
  reference: string
}

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdrawal', label: 'Withdrawal' },
  { value: 'bet', label: 'Bet' },
  { value: 'win', label: 'Win' }
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' }
]

export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    setTransactions([
      { id: 1, user_name: 'John Doe', type: 'deposit', amount: 1000, status: 'completed', date: '2024-01-15', reference: 'TXN001' },
      { id: 2, user_name: 'Jane Smith', type: 'withdrawal', amount: 500, status: 'pending', date: '2024-01-15', reference: 'TXN002' },
      { id: 3, user_name: 'Mike Johnson', type: 'bet', amount: 100, status: 'completed', date: '2024-01-14', reference: 'TXN003' }
    ])
    setLoading(false)
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Transactions"
          value={transactions.length}
          icon={<CreditCard className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Deposits"
          value={`₹${transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Withdrawals"
          value={`₹${transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`}
          icon={<TrendingDown className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Net Balance"
          value={`₹${(transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0) - transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}`}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            suppressHydrationWarning
          />
        </div>
        <div className="flex space-x-4">
          <Dropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={typeOptions}
            placeholder="All Types"
          />
          <Dropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            placeholder="All Status"
          />
        </div>
      </div>

      <DataTable<Transaction>
        data={transactions.filter(txn => {
          const matchesSearch = searchTerm === '' || 
            txn.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.reference?.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesType = !typeFilter || txn.type === typeFilter
          const matchesStatus = !statusFilter || txn.status === statusFilter
          return matchesSearch && matchesType && matchesStatus
        })}
        columns={[
          { key: 'reference', label: 'Reference' },
          { key: 'user_name', label: 'User' },
          {
            key: 'type',
            label: 'Type',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                value === 'deposit' ? 'bg-green-100 text-green-800' :
                value === 'withdrawal' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {String(value)}
              </span>
            )
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (value) => <span className="font-medium">₹{value}</span>
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                value === 'completed' ? 'bg-green-100 text-green-800' :
                value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {String(value)}
              </span>
            )
          },
          {
            key: 'date',
            label: 'Date',
            render: (value) => new Date(String(value)).toLocaleDateString()
          }
        ]}
        emptyMessage="No transactions found"
        loading={loading}
        actions={(txn) => (
          <ViewButton size="small" onClick={() => console.log('View', txn.id)} />
        )}
      />
    </div>
  )
}