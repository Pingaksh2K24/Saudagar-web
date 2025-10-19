'use client'
import { useState } from 'react'
import Modal from './Modal'
import Button from './button/page'
import { showSuccess, showError } from '../../../utils/notification'

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated, projectId, projectName }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          status,
          priority,
          dueDate,
          projectId,
          projectName
        })
      })

      const data = await response.json()

      if (response.ok) {
        showSuccess(data.message || 'Task created successfully!')
        onTaskCreated(data.task)
        setTitle('')
        setDescription('')
        setStatus('pending')
        setPriority('medium')
        setDueDate('')
        onClose()
      } else {
        showError(`${data.error}${data.details ? ` - ${data.details}` : ''}`)
      }
    } catch (error) {
      console.error('Error creating task:', error)
      showError(`Network Error: ${error.message}. Please check your connection.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Task</h2>
      {projectName && (
        <p className="text-sm text-gray-600 mb-6">Project: <span className="font-medium text-indigo-600">{projectName}</span></p>
      )}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter task title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="pending">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex space-x-3 pt-4">
          <Button
            variant="danger"
            caption="Cancel"
            onClick={onClose}
            size="sm"
          />
          <Button
            variant="primary"
            caption={loading ? 'Creating...' : 'Create Task'}
            disabled={loading || !title.trim() || !description.trim()}
            onClick={handleSubmit} size="sm"
          />
        </div>
      </form>
    </Modal>
  )
}