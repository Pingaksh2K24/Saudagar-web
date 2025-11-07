'use client'
import { useState } from 'react'
import { NotificationImportant, Send, Group, Person } from '@mui/icons-material'
import Button from '@/components/ui/button/page'
import Dropdown from '@/components/ui/dropdown/page'

const recipientOptions = [
  { value: 'all', label: 'All Users' },
  { value: 'active', label: 'Active Users Only' },
  { value: 'specific', label: 'Specific User' }
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

export default function SendNotificationPage() {
  const [recipient, setRecipient] = useState('')
  const [specificUser, setSpecificUser] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState('medium')
  const [scheduleNow, setScheduleNow] = useState(true)

  const handleSend = () => {
    console.log('Sending notification:', { recipient, specificUser, title, message, priority, scheduleNow })
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <NotificationImportant className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Send Notification</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Compose Notification
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
              <Dropdown
                value={recipient}
                onChange={(value) => setRecipient(String(value))}
                options={recipientOptions}
                placeholder="Select Recipients"
              />
            </div>

            {recipient === 'specific' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID/Email</label>
                <input
                  type="text"
                  value={specificUser}
                  onChange={(e) => setSpecificUser(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter user ID or email"
                  suppressHydrationWarning
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Notification title"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows={4}
                placeholder="Notification message"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <Dropdown
                value={priority}
                onChange={(value) => setPriority(String(value))}
                options={priorityOptions}
                placeholder="Select Priority"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="scheduleNow"
                checked={scheduleNow}
                onChange={(e) => setScheduleNow(e.target.checked)}
                className="mr-2"
                suppressHydrationWarning
              />
              <label htmlFor="scheduleNow" className="text-sm font-medium text-gray-700">
                Send Immediately
              </label>
            </div>

            <Button
              caption="Send Notification"
              variant="primary"
              icon={<Send />}
              onClick={handleSend}
              disabled={!recipient || !title || !message}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center mb-2">
              <NotificationImportant className="w-5 h-5 text-red-500 mr-2" />
              <span className="font-medium">{title || 'Notification Title'}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {message || 'Your notification message will appear here...'}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Priority: {priority}</span>
              <span>To: {recipient || 'Recipients'}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-3">Quick Templates</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setTitle('Welcome to Saudagar!')
                  setMessage('Start playing and win big rewards!')
                }}
                className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-sm"
              >
                Welcome Message
              </button>
              <button
                onClick={() => {
                  setTitle('Game Result Declared')
                  setMessage('Check the latest game results now!')
                }}
                className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 text-sm"
              >
                Result Notification
              </button>
              <button
                onClick={() => {
                  setTitle('Maintenance Notice')
                  setMessage('System will be under maintenance from 2 AM to 4 AM.')
                }}
                className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 text-sm"
              >
                Maintenance Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}