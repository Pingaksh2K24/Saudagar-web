'use client'
import { useState } from 'react'
import { PhoneAndroid, Save, Info, Update } from '@mui/icons-material'
import Button from '@/components/ui/button/page'

export default function AppInfoPage() {
  const [appName, setAppName] = useState('Saudagar')
  const [appVersion, setAppVersion] = useState('1.0.0')
  const [supportEmail, setSupportEmail] = useState('support@saudagar.com')
  const [supportPhone, setSupportPhone] = useState('+91 9876543210')
  const [privacyPolicy, setPrivacyPolicy] = useState('')
  const [termsConditions, setTermsConditions] = useState('')

  const handleSave = () => {
    console.log('Saving app info:', { appName, appVersion, supportEmail, supportPhone })
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <PhoneAndroid className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">App Info</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            App Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">App Version</label>
              <input
                type="text"
                value={appVersion}
                onChange={(e) => setAppVersion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
              <input
                type="tel"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <Button
              caption="Save Info"
              variant="primary"
              icon={<Save />}
              onClick={handleSave}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Update className="w-5 h-5 mr-2" />
            Legal Documents
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy URL</label>
              <input
                type="url"
                value={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="https://example.com/privacy"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions URL</label>
              <input
                type="url"
                value={termsConditions}
                onChange={(e) => setTermsConditions(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="https://example.com/terms"
                suppressHydrationWarning
              />
            </div>

            <Button
              caption="Update Links"
              variant="secondary"
              icon={<Update />}
              onClick={() => console.log('Updating legal links')}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">System Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Database</div>
            <div className="text-lg font-semibold text-blue-600">Firebase</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600">Server Status</div>
            <div className="text-lg font-semibold text-green-600">Online</div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-gray-600">Last Backup</div>
            <div className="text-lg font-semibold text-yellow-600">2 hours ago</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-lg font-semibold text-purple-600">1,234</div>
          </div>
        </div>
      </div>
    </div>
  )
}