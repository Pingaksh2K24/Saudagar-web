'use client'
import { useState, useEffect } from 'react'
import { Close, Edit } from '@mui/icons-material'
import Button from '../../components/button/page'
import Dropdown from '../../components/dropdown/page'
import { getUserSession } from '../../../utils/cookies'
import { showSuccess, showError } from '../../../../utils/notification'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  onUserUpdated: () => void
  user: {
    id: number
    full_name: string
    email: string
    mobile_number: string
    role: string
    status: string
    village: string
    address: string
  } | null
}

export default function EditUserModal({ isOpen, onClose, onUserUpdated, user }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    role: 'user',
    status: 'active',
    village: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  
  const roleOptions = [
    { value: 'agent', label: 'Agent' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' }
  ]
  
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  useEffect(() => {
    if (user && typeof user === 'object') {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        mobile_number: user.mobile_number || '',
        role: user.role || 'user',
        status: user.status || 'active',
        village: user.village || '',
        address: user.address || ''
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)



    
    try {
      const session = getUserSession()
      const requestBody = {
        full_name: formData.full_name,
        mobile_number: formData.mobile_number,
        role: formData.role,
        email: formData.email,
        status: formData.status,
        village: formData.village,
        address: formData.address
      }
      
      const response = await fetch(`https://saudagar-backend.onrender.com/api/auth/users/${user.id}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.token}`,
          'X-User-ID': session?.user?.id
        },
        body: JSON.stringify(requestBody)
      })
      
      if (response.ok) {
        showSuccess('User updated successfully!')
        onUserUpdated()
        onClose()
      } else {
        showError('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      showError('Error updating user')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[500px] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Edit className="w-5 h-5 mr-2 text-red-500" />
            Edit User
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Close className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile_number: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <Dropdown
              options={roleOptions}
              value={formData.role}
              onChange={(value) => setFormData(prev => ({ ...prev, role: String(value) }))}
              placeholder="Select Role"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              options={statusOptions}
              value={formData.status}
              onChange={(value) => setFormData(prev => ({ ...prev, status: String(value) }))}
              placeholder="Select Status"
              required
            />
            <input
              type="text"
              placeholder="Village"
              value={formData.village}
              onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              caption="Cancel"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            />
            <Button
              type="submit"
              caption="Update User"
              variant="primary"
              loading={loading}
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  )
}