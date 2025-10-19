'use client'
import { useState, useEffect, useCallback } from 'react'
import CreateProjectModal from '../../components/CreateProjectModal'
import CreateTaskModal from '../../components/CreateTaskModal'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import StatsCards from '../../components/dashboard/StatsCards'
import ProjectsSection from '../../components/dashboard/ProjectsSection'
import { useProjectStore } from '../../store/projectStore'
import { showError } from '../../../../utils/notification'
import { apiClient } from '../../../../utils/api'
import { Project, Task } from '../../../types'

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | number | null>(null)
  const [selectedProjectName, setSelectedProjectName] = useState<string>('')

  const setAllProjects = useProjectStore(state => state.setAllProjects)
  
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiClient.projects.getAll()
      setProjects(response.data.projects)
      setAllProjects(response.data.projects) // Store in global state
      if (response.data.message) {
        console.log('Log Message', response.data.message)
      }
    } catch (error) {
      console.error('API Error:', error)
      const axiosError = error as { response?: { data?: { error?: string; details?: string } } }
      const standardError = error as Error
      const errorMessage = axiosError?.response?.data?.error || standardError?.message || 'Unknown error'
      const errorDetails = axiosError?.response?.data?.details
      showError(`Failed to load projects: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ''}`)
    } finally {
      setLoading(false)
    }
  }, [setAllProjects])

  // useEffect(() => {
  //   fetchProjects()
  // }, [fetchProjects])

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prev => [...prev, newProject])
  }

  const handleAddTask = (projectId: string | number) => {
    const project = projects.find(p => p.id === projectId)
    setSelectedProjectId(projectId)
    setSelectedProjectName(project?.name || '')
    setIsTaskModalOpen(true)
  }

  const handleTaskCreated = (newTask: Task) => {
    // Update project's tasks array
    setProjects(prev => prev.map(project => 
      project.id === selectedProjectId 
        ? { ...project, tasks: [...project.tasks, newTask] }
        : project
    ))
  }

  return (
    <div className="p-6">
      <DashboardHeader onNewProject={() => setIsModalOpen(true)} />
      
      <StatsCards games={projects} />
      
      <ProjectsSection 
        projects={projects}
        loading={loading}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddTask={handleAddTask}
      />
      
      <CreateProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
      
      <CreateTaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        projectId={selectedProjectId?.toString() || ''}
        projectName={selectedProjectName}
      />
    </div>
  )
}