'use client'
import { useState, useEffect } from 'react'
import { useProjectStore } from '../../store/projectStore'
import { EditButton, DeleteButton} from '../../components/action/page'

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  const { allProjects } = useProjectStore()
  
  useEffect(() => {
    if (allProjects && allProjects.length > 0) {
      // Use stored projects data
      setProjects(allProjects)
      setLoading(false)
    } else {
      // Fetch from API if no stored data
      fetchProjects()
    }
  }, [allProjects])
  
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }
  const itemsPerPage = 10
  const totalPages = Math.ceil(projects.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = projects.slice(startIndex, endIndex)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Project Management
        </h1>
        <p className="text-gray-600 text-lg">Manage and track all your projects in one place</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Project List ({projects.length})</h3>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                + Add Project
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
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Project</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Priority</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Manager</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Budget</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Timeline</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm capitalize tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No projects found
                  </td>
                </tr>
              ) : currentProjects.map((project, index) => (
                <tr key={project.id} className={`transition-colors group ${
                  index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600">{project.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-xs text-gray-500">{(project.description || '').substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        project.status === 'active' ? 'bg-green-500' :
                        project.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}></span>
                      {project.status?.charAt(0).toUpperCase() + project.status?.slice(1) || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      project.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                      project.priority === 'medium' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        project.priority === 'high' ? 'bg-red-500' :
                        project.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-500'
                      }`}></span>
                      {project.priority?.charAt(0).toUpperCase() + project.priority?.slice(1) || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{(project.createdBy || 'U').charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-sm text-gray-900">{project.createdBy?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">${project.budget || 0}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</div>
                    <div className="text-xs text-gray-500">Created</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <EditButton 
                        size="small" 
                        onClick={() => console.log('Edit project:', project.id)}
                      />
                      <DeleteButton 
                        size="small" 
                        onClick={() => console.log('Delete project:', project.id)}
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
            Showing {startIndex + 1} to {Math.min(endIndex, projects.length)} of {projects.length} results
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
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
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
    </div>
  )
}