'use client'
import { useState } from 'react'
import { Security, Save, Lock, Shield } from '@mui/icons-material'
import Button from '@/components/ui/button/index'

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5')

  const handlePasswordChange = () => {
    console.log('Changing password')
  }

  const handleSecuritySave = () => {
    console.log('Saving security settings:', { twoFactorEnabled, sessionTimeout, maxLoginAttempts })
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Security className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Security & Access</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <Button
              caption="Change Password"
              variant="primary"
              icon={<Save />}
              onClick={handlePasswordChange}
              disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                <p className="text-xs text-gray-500">Add extra security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="toggle"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
              <input
                type="number"
                value={maxLoginAttempts}
                onChange={(e) => setMaxLoginAttempts(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <Button
              caption="Save Settings"
              variant="primary"
              icon={<Save />}
              onClick={handleSecuritySave}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Security Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">Strong</div>
            <div className="text-sm text-gray-600">Password Strength</div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <div className="text-sm text-gray-600">Security Level</div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Active Sessions</div>
          </div>
        </div>
      </div>
    </div>
  )
}