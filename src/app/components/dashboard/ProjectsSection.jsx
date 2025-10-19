'use client'
import { SVGIcons } from '../../../../utils/svgConstants'
import ProjectCard from '../project/ProjectCard'
import ProjectListItem from '../project/ProjectListItem'

export default function ProjectsSection({ 
  projects, 
  loading, 
  viewMode, 
  onViewModeChange, 
  onAddTask 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Projects</h2>
          <p className="text-gray-500">Manage and track your project progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SVGIcons.Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SVGIcons.List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onAddTask={onAddTask} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <ProjectListItem key={project.id} project={project} onAddTask={onAddTask} />
          ))}
        </div>
      )}
    </div>
  )
}