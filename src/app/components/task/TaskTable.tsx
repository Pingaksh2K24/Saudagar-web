'use client'
import { useState } from 'react'
import DataTable, { Column, Filter, StatsCard } from '../table/page'
import { EditButton, DeleteButton } from '../action/page'
import TaskModal from '../modal/TaskModal'

interface Task {
  id?: number
  title: string
  status: 'pending' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  project?: string
}

interface TaskTableProps {
  tasks: Task[]
}

export default function TaskTable({ tasks = [] }: TaskTableProps) {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleAddTask = () => {
    setModalMode('add')
    setSelectedTask(null)
    setShowModal(true)
  }

  const handleEditTask = (task: Task) => {
    setModalMode('edit')
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleSaveTask = (taskData: Task) => {
    if (modalMode === 'add') {
      console.log('Adding new task:', taskData)
    } else {
      console.log('Updating task:', taskData)
    }
    // Here you would typically update your tasks state or call an API
  }
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
    const className = status === 'completed' 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-yellow-100 text-yellow-800`
    
    return (
      <span className={className}>
        {status === 'completed' && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        {status}
      </span>
    )
  }

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return <span className="text-gray-400 text-sm">-</span>
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-orange-100 text-orange-800', 
      high: 'bg-red-100 text-red-800'
    }
    return <span className={`${baseClasses} ${colors[priority as keyof typeof colors]}`}>{priority}</span>
  }

  const columns: Column<Task>[] = [
    {
      key: 'title',
      label: 'Task',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-3 ${
            row.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <div className="text-sm font-medium text-gray-900">{String(value)}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(String(value))
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value) => getPriorityBadge(value as string)
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true
    },
    {
      key: 'project',
      label: 'Project'
    }
  ]

  const filters: Filter[] = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' }
      ]
    },
    {
      key: 'priority',
      label: 'Priority',
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ]
    }
  ]

  const completedCount = tasks?.filter(t => t.status === 'completed').length || 0
  const pendingCount = tasks?.filter(t => t.status === 'pending').length || 0

  const statsCards: StatsCard[] = [
    {
      title: 'Total Tasks',
      value: tasks?.length || 0,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Completed',
      value: completedCount,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Pending',
      value: pendingCount,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Add Task Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleAddTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>
      
      <DataTable<Task>
        data={tasks}
        columns={columns}
        filters={filters}
        statsCards={statsCards}
        searchPlaceholder="Search tasks..."
        emptyMessage="No tasks found"
        actions={(row) => (
          <div className="flex items-center justify-end space-x-2">
            <EditButton 
              size="small" 
              onClick={() => handleEditTask(row)}
            />
            <DeleteButton 
              size="small" 
              onClick={() => console.log('Delete task', row.id)}
            />
          </div>
        )}
      />
      
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTask}
        task={selectedTask}
        mode={modalMode}
      />
    </div>
  )
}