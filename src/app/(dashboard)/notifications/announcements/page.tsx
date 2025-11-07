'use client'
import { useState, useEffect } from 'react'
import { Announcement, Add } from '@mui/icons-material'
import Button from '@/components/ui/button/page'
import DataTable from '@/components/table/page'
import { ViewButton, EditButton, DeleteButton } from '@/components/action/page'

interface AnnouncementData extends Record<string, unknown> {
  id: number
  title: string
  content: string
  status: string
  created_date: string
  expires_date: string
  [key: string]: unknown
}

export default function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  useEffect(() => {
    setAnnouncements([
      { id: 1, title: 'New Game Launch', content: 'Exciting new game coming soon!', status: 'active', created_date: '2024-01-15', expires_date: '2024-02-15' },
      { id: 2, title: 'Maintenance Notice', content: 'System maintenance scheduled for tonight.', status: 'active', created_date: '2024-01-14', expires_date: '2024-01-16' },
      { id: 3, title: 'Winner Announcement', content: 'Congratulations to our big winners!', status: 'expired', created_date: '2024-01-10', expires_date: '2024-01-13' }
    ])
    setLoading(false)
  }, [])

  const handleCreate = () => {
    const newAnnouncement = {
      id: Date.now(),
      title,
      content,
      status: 'active',
      created_date: new Date().toISOString().split('T')[0],
      expires_date: expiryDate
    }
    setAnnouncements(prev => [newAnnouncement, ...prev])
    setTitle('')
    setContent('')
    setExpiryDate('')
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Announcement className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Manage Announcements</h1>
        </div>
        <Button
          caption="New Announcement"
          variant="primary"
          icon={<Add />}
          onClick={() => setShowForm(!showForm)}
        />
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Announcement</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Announcement title"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows={3}
                placeholder="Announcement content"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                suppressHydrationWarning
              />
            </div>

            <div className="flex space-x-4">
              <Button
                caption="Create"
                variant="primary"
                onClick={handleCreate}
                disabled={!title || !content || !expiryDate}
              />
              <Button
                caption="Cancel"
                variant="secondary"
                onClick={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      <DataTable<AnnouncementData>
        data={announcements}
        columns={[
          { key: 'title', label: 'Title' },
          {
            key: 'content',
            label: 'Content',
            render: (value) => (
              <span className="text-sm text-gray-600">
                {String(value).length > 50 ? `${String(value).substring(0, 50)}...` : String(value)}
              </span>
            )
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {String(value)}
              </span>
            )
          },
          {
            key: 'created_date',
            label: 'Created',
            render: (value) => new Date(String(value)).toLocaleDateString()
          },
          {
            key: 'expires_date',
            label: 'Expires',
            render: (value) => new Date(String(value)).toLocaleDateString()
          }
        ]}
        emptyMessage="No announcements found"
        loading={loading}
        actions={(announcement) => (
          <div className="flex items-center space-x-2">
            <ViewButton size="small" onClick={() => console.log('View', announcement.id)} />
            <EditButton size="small" onClick={() => console.log('Edit', announcement.id)} />
            <DeleteButton size="small" onClick={() => handleDelete(announcement.id)} />
          </div>
        )}
      />
    </div>
  )
}