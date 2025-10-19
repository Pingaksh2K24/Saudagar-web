'use client'
import { useRouter } from 'next/navigation'
import { useProjectStore } from '../../store/projectStore'
import { Project, ProjectCardProps } from '../../../types'

interface ProjectListItemProps {
  project: Project
  onAddTask?: (projectId: string | number) => void
}

export default function ProjectListItem({ project, onAddTask }: ProjectListItemProps) {
  const router = useRouter()
  const setSelectedProject = useProjectStore(state => state.setSelectedProject)
  
  const completedTasks = (project.tasks || []).filter(task => task.status === 'completed').length
  const totalTasks = (project.tasks || []).length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  
  const handleProjectClick = () => {
    setSelectedProject(project)
    router.push(`/tasks?projectId=${project.id}`)
  }

  return (
    <div 
      onClick={handleProjectClick}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div className="flex items-start space-x-4 flex-1">
          {/* Project Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
            {project.name.charAt(0)}
          </div>

          {/* Project Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
              </div>
            </div>

            {/* Progress and Stats */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-gray-700">Progress:</span>
                <div className="w-40 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-indigo-600">{Math.round(progressPercentage)}%</span>
                <span className="text-xs text-gray-500">({completedTasks}/{totalTasks})</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{completedTasks} completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{totalTasks - completedTasks} pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Recent Tasks */}
        <div className="ml-8 flex-shrink-0">
          <div className="text-right">
            <div className="flex items-center justify-end mb-3">
              <span className="text-sm font-semibold text-gray-700">Recent Tasks</span>
              <div className="flex items-center space-x-2 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddTask?.(project.id)
                  }}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  + Add Task
                </button>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {project.tasks.length}
                </span>
              </div>
            </div>

            <div className="space-y-2 min-w-0" style={{ width: '200px' }}>
              {project.tasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${task.status === 'completed'
                      ? 'bg-gradient-to-r from-green-400 to-green-500'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    }`}></div>
                  <span className={`text-sm flex-1 truncate ${task.status === 'completed'
                      ? 'line-through text-gray-500'
                      : 'text-gray-700 font-medium'
                    }`} title={task.title}>
                    {task.title}
                  </span>
                  {task.status === 'completed' && (
                    <svg className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}

              {project.tasks.length > 3 && (
                <div className="text-center pt-2">
                  <span className="text-xs text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer">
                    +{project.tasks.length - 3} more
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}