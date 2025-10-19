'use client'
import DataTable, { Column, Filter, StatsCard } from '../table/page'
import { EditButton, DeleteButton, ViewButton } from '../action/page'

interface Task {
  id: number
  title: string
  status: 'pending' | 'completed'
}

interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
  priority: 'low' | 'medium' | 'high'
  startDate: string
  endDate: string
  manager: string
  team: string[]
  tasks: Task[]
  budget?: string
}

interface ProjectTableProps {
  projects: Project[]
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium"
    const colors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      'on-hold': 'bg-yellow-100 text-yellow-800'
    }
    return <span className={`${baseClasses} ${colors[status as keyof typeof colors]}`}>{status}</span>
  }

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800'
    }
    return <span className={`${baseClasses} ${colors[priority as keyof typeof colors]}`}>{priority}</span>
  }

  const getProgress = (project: Project) => {
    const completed = project.tasks.filter(t => t.status === 'completed').length
    const total = project.tasks.length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const columns: Column<Project>[] = [
    {
      key: 'name',
      label: 'Project',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{String(value)}</div>
          <div className="text-sm text-gray-500">{row.description}</div>
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
      render: (value) => getPriorityBadge(String(value))
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (_, row) => {
        const progress = getProgress(row)
        return (
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
        )
      }
    },
    {
      key: 'manager',
      label: 'Manager'
    },
    {
      key: 'team',
      label: 'Team',
      render: (value) => {
        const teamArray = value as string[]
        if (!teamArray || !Array.isArray(teamArray)) return <span className="text-gray-400">-</span>
        return (
          <div className="flex -space-x-1">
            {teamArray.slice(0, 3).map((member: string, index: number) => (
              <div
                key={index}
                className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white"
                title={member}
              >
                {member.charAt(0)}
              </div>
            ))}
            {teamArray.length > 3 && (
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white">
                +{teamArray.length - 3}
              </div>
            )}
          </div>
        )
      }
    },
    {
      key: 'dates',
      label: 'Dates',
      render: (_, row) => (
        <div className="text-sm text-gray-600">
          <div>{row.startDate}</div>
          <div className="text-gray-400">to {row.endDate}</div>
        </div>
      )
    }
  ]

  const filters: Filter[] = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'on-hold', label: 'On Hold' }
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

  const activeCount = projects.filter(p => p.status === 'active').length
  const completedCount = projects.filter(p => p.status === 'completed').length
  const onHoldCount = projects.filter(p => p.status === 'on-hold').length

  const statsCards: StatsCard[] = [
    {
      title: 'Total Projects',
      value: projects.length,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Active',
      value: activeCount,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'Completed',
      value: completedCount,
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600'
    },
    {
      title: 'On Hold',
      value: onHoldCount,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    }
  ]

  return (
    <DataTable<Project>
      data={projects}
      columns={columns}
      filters={filters}
      statsCards={statsCards}
      searchPlaceholder="Search projects..."
      emptyMessage="No projects found"
      pagination={false}
      actions={(row) => (
        <div className="flex items-center justify-end space-x-2">
          <ViewButton size="small" onClick={() => console.log('View', row.id)} />
          <EditButton size="small" onClick={() => console.log('Edit', row.id)} />
          <DeleteButton size="small" onClick={() => console.log('Delete', row.id)} />
        </div>
      )}
    />
  )
}