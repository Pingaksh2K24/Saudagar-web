'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProjectStore } from '../../store/projectStore'
import { EditButton, DeleteButton } from '../../components/action/page'
import EditTaskModal from '../../components/EditTaskModal'
import ConfirmationDialog from '../../components/common/ConfirmationDialog'
import { showSuccess, showError } from '../../../../utils/notification'
import { capitalize } from '../../../../utils/helper'

export default function TasksPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')

  const { selectedProject, allProjects } = useProjectStore()

  useEffect(() => {
    if (projectId && selectedProject && selectedProject.id === projectId) {
      // Use stored project data
      setTasks(selectedProject.tasks || [])
      setLoading(false)
    } else if (projectId) {
      // Find project in allProjects if selectedProject doesn't match
      const project = allProjects.find(p => p.id === projectId)
      if (project) {
        setTasks(project.tasks || [])
        setLoading(false)
      } else {
        // Fallback: fetch from API
        fetchTasks(projectId)
      }
    } else {
      // Fetch all tasks
      fetchAllTasks()
    }
  }, [projectId, selectedProject, allProjects])

  const fetchTasks = async (projectId) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tasks?projectId=${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks || [])
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tasks')
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks || [])
      }
    } catch (error) {
      console.error('Error fetching all tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setIsEditModalOpen(true)
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev => prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const handleDeleteClick = (task) => {
    setTaskToDelete(task)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return

    setDeleteLoading(true)
    try {
      const response = await fetch(`/api/tasks?id=${taskToDelete.id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (response.ok) {
        showSuccess(data.message || 'Task deleted successfully!')
        setTasks(prev => prev.filter(task => task.id !== taskToDelete.id))
        setIsDeleteDialogOpen(false)
        setTaskToDelete(null)
      } else {
        showError(`${data.error}${data.details ? ` - ${data.details}` : ''}`)
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      showError(`Network Error: ${error.message}. Please check your connection.`)
    } finally {
      setDeleteLoading(false)
    }
  }
  const itemsPerPage = 10
  const totalPages = Math.ceil(tasks.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTasks = tasks.slice(startIndex, endIndex)

  const pageTitle = selectedProject && projectId
    ? `${selectedProject.name} - Tasks`
    : 'All Tasks'

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {pageTitle}
        </h1>
        <p className="text-gray-600 text-lg">
          {projectId ? `Tasks for ${selectedProject?.name || 'this project'}` : 'Organize, track, and manage all your tasks in one place'}
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {projectId ? `${selectedProject?.name || 'Project'} Tasks` : 'All Tasks'} ({tasks.length})
            </h3>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                + Add Task
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Task</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Priority</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Due Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Project</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              ) : currentTasks.map((task, index) => (
                <tr key={task.id} className={`transition-colors group ${index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium ${task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}>
                          {task.status === 'completed' ? '✓' : index + startIndex + 1}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-xs text-gray-500">ID: #{task.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${task.status === 'completed'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></span>
                      {task.status === 'pending' ? 'Todo' : capitalize(task.status) || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                        'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-500'
                        }`}></span>
                      {capitalize(task.priority) || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{task.dueDate}</div>
                    <div className="text-xs text-gray-500">Due date</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-indigo-600">{(task.projectName || task.project || 'U').charAt(0)}</span>
                      </div>
                      <span className="text-sm text-gray-900">{task.projectName || task.project || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <EditButton
                        size="small"
                        onClick={() => handleEditTask(task)}
                      />
                      <DeleteButton
                        size="small"
                        onClick={() => handleDeleteClick(task)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 mb-8 px-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, tasks.length)} of {tasks.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onTaskUpdated={handleTaskUpdated}
        task={selectedTask}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        type="delete"
        itemName={taskToDelete?.title}
        loading={deleteLoading}
      />
    </div>
  )
}