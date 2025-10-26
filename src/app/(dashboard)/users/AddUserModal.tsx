'use client'
import { useState } from 'react'
import { Close, PersonAdd } from '@mui/icons-material'
import Button from '../../components/button/page'
import Dropdown from '../../components/dropdown/page'
import { getUserSession } from '../../../utils/cookies'
import { showSuccess, showError } from '../../../../utils/notification'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onUserAdded: () => void
}

export default function AddUserModal({ isOpen, onClose, onUserAdded }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    password: '',
    confirmPassword: '',
    role: 'agent',
    village: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  
  const roleOptions = [
    { value: 'agent', label: 'Agent' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match')
      return
    }
    
    setLoading(true)
    
    try {
      const session = getUserSession()
      const { confirmPassword, ...submitData } = formData
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...submitData,
          created_by: session?.user?.id || 'Admin'
        })
      })
      
      if (response.ok) {
        setFormData({ full_name: '', email: '', mobile_number: '', password: '', confirmPassword: '', role: '', village: '', address: '' })
        onUserAdded()
        onClose()
      }
    } catch (error) {
      console.error('Error adding user:', error)
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
            <PersonAdd className="w-5 h-5 mr-2 text-red-500" />
            Add New User
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
              onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              placeholder="Select Role"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Village"
              value={formData.village}
              onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
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
              caption="Add User"
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