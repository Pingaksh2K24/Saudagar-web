'use client'
import { useState } from 'react'
import { Build, Save } from '@mui/icons-material'
import Button from '@/components/ui/button/page'
import Dropdown from '@/components/ui/dropdown/page'

const userOptions = [
  { value: 'user1', label: 'John Doe' },
  { value: 'user2', label: 'Jane Smith' },
  { value: 'user3', label: 'Mike Johnson' }
]

const typeOptions = [
  { value: 'credit', label: 'Credit (Add Money)' },
  { value: 'debit', label: 'Debit (Deduct Money)' }
]

export default function ManualAdjustmentsPage() {
  const [selectedUser, setSelectedUser] = useState('')
  const [adjustmentType, setAdjustmentType] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [adminNote, setAdminNote] = useState('')

  const handleSubmit = () => {
    console.log('Manual adjustment:', {
      selectedUser,
      adjustmentType,
      amount,
      reason,
      adminNote
    })
    // Reset form
    setSelectedUser('')
    setAdjustmentType('')
    setAmount('')
    setReason('')
    setAdminNote('')
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Build className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Manual Adjustments</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Create Manual Adjustment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
              <Dropdown
                value={selectedUser}
                onChange={(value) => setSelectedUser(String(value))}
                options={userOptions}
                placeholder="Choose User"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Type</label>
              <Dropdown
                value={adjustmentType}
                onChange={(value) => setAdjustmentType(String(value))}
                options={typeOptions}
                placeholder="Select Type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Reason for adjustment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Note</label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows={3}
                placeholder="Additional notes..."
              />
            </div>

            <Button
              caption="Process Adjustment"
              variant="primary"
              icon={<Save />}
              onClick={handleSubmit}
              disabled={!selectedUser || !adjustmentType || !amount || !reason}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Adjustments</h2>
          
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-sm text-green-600">+₹500</span>
              </div>
              <p className="text-xs text-gray-500">Bonus credit - Today</p>
            </div>
            
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Jane Smith</span>
                <span className="text-sm text-red-600">-₹200</span>
              </div>
              <p className="text-xs text-gray-500">Penalty deduction - Yesterday</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mike Johnson</span>
                <span className="text-sm text-green-600">+₹1000</span>
              </div>
              <p className="text-xs text-gray-500">Compensation - 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}