'use client'
import { useState, useEffect } from 'react'
import { Close, Edit } from '@mui/icons-material'
import Button from '../../components/button/page'
import { getUserSession } from '../../../utils/cookies'
import { showSuccess, showError } from '../../../../utils/notification'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  onUserUpdated: () => void
  user: any
}

export default function EditUserModal({ isOpen, onClose, onUserUpdated, user }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    role: 'user',
    status: 'active'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        mobile_number: user.mobile_number || '',
        role: user.role || 'user',
        status: user.status || 'active'
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const session = getUserSession()
      const response = await fetch(`http://localhost:3000/api/auth/users/${user.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.token}`,
          'X-User-ID': session?.user?.id
        },
        body: JSON.stringify(formData)
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
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile_number: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
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