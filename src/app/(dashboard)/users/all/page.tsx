'use client'
import { useState, useEffect } from 'react'
import { Group, People, PersonAdd, SupervisorAccount, Search } from '@mui/icons-material'
import DataTable from '../../../components/table/page'
import { EditButton, DeleteButton } from '../../../components/action/page'
import StatsCard from '../StatsCard'
import Dropdown from '../../../components/dropdown/page'
import AddUserModal from '../AddUserModal'
import EditUserModal from '../EditUserModal'
import { getUserSession } from '@/utils/cookies'
import Button from '../../../components/button/page'
// 

interface User extends Record<string, unknown> {
  id: number
  full_name: string
  email: string
  mobile_number: string
  role: string
  status: string
  village: string
  address: string
  created_at: string
  [key: string]: unknown
}

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'agent', label: 'Agent' }
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/getAllUserList');
      console.log('Fetch All User List response:', response);
      if (response.ok && response.status === 200) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          console.log('Fetched Users:', data.users);
          setUsers(Array.isArray(data.users) ? data.users : [])
        } else {
          setUsers([])
        }
      } else {
        setUsers([])
      }
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      const session = getUserSession()
      const response = await fetch(`http://localhost:3000/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'X-User-ID': session?.user?.id
        }
      })
      
      if (response.ok) {
        console.log('User deleted successfully!')
        fetchUsers()
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      console.error('Error deleting user')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Group className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
        </div>
        <Button
          caption="Add User"
          variant="primary"
          icon={<PersonAdd />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={<People className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Active Users"
          value={users.filter(u => u.status === 'Active').length}
          icon={<PersonAdd className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Admins"
          value={users.filter(u => u.role === 'admin').length}
          icon={<SupervisorAccount className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Moderators"
          value={users.filter(u => u.role === 'moderator').length}
          icon={<Group className="w-6 h-6" />}
          gradient="from-indigo-500 to-indigo-600"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            suppressHydrationWarning
          />
        </div>
        <div className="flex items-center space-x-4">
          <Dropdown
            value={activeFilters.role || ''}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, role: String(value) }))}
            options={roleOptions}
            placeholder="All Roles"
            className="min-w-32"
          />
          <Dropdown
            value={activeFilters.status || ''}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, status: String(value) }))}
            options={statusOptions}
            placeholder="All Status"
            className="min-w-32"
          />
        </div>
      </div>

      <DataTable<User>
        data={users.filter(user => {
          const matchesSearch = searchTerm === '' || 
            user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesRole = !activeFilters.role || user.role === activeFilters.role
          const matchesStatus = !activeFilters.status || user.status === activeFilters.status
          return matchesSearch && matchesRole && matchesStatus
        })}
        columns={[
          {
            key: 'full_name',
            label: 'User',
            sortable: true,
            render: (value, user) => (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{String(value).charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{String(value)}</div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </div>
              </div>
            )
          },
          {
            key: 'email',
            label: 'Contact',
            render: (value, user) => (
              <div>
                <div className="text-sm text-gray-900">{String(value)}</div>
                <div className="text-sm text-gray-500">{user.mobile_number}</div>
              </div>
            )
          },
          {
            key: 'role',
            label: 'Role',
            render: (value) => {
              const role = String(value)
              return (
                <span className={`px-2 py-1 text-xs capitalize font-semibold rounded-full ${
                  role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {role}
                </span>
              )
            }
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => {
              const status = String(value)
              return (
                <span className={`px-2 py-1 text-xs capitalize font-semibold rounded-full ${
                  status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {status}
                </span>
              )
            }
          },
          {
            key: 'created_at',
            label: 'Joined',
            render: (value) => (
              <span className="text-sm text-gray-500">
                {new Date(String(value)).toLocaleDateString()}
              </span>
            )
          }
        ]}
        emptyMessage="No users found"
        loading={loading}
        actions={(user) => (
          <div className="flex items-center justify-end space-x-4">
            <EditButton size="small" onClick={() => {
              setSelectedUser(user)
              setIsEditModalOpen(true)
            }} />
            <DeleteButton size="small" onClick={() => {
              if (confirm('Are you sure you want to delete this user?')) {
                handleDeleteUser(user.id)
              }
            }} />
          </div>
        )}
      />
      
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserAdded={fetchUsers}
      />
      
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUserUpdated={fetchUsers}
        user={selectedUser as User | null}
      />
    </div>
  )
}