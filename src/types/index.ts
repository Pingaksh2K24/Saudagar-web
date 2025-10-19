// Common interfaces and types for the application

export interface Task {
  id: string | number
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  projectId?: string | number
  projectName?: string
  createdBy?: string
  createdAt?: string
  userId?: string
}

export interface Project {
  id: string | number
  name: string
  description: string
  status?: 'active' | 'on-hold' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  budget?: number
  tasks: Task[]
  createdBy?: string
  createdAt?: string
  userId?: string
}

export interface User {
  id: string
  name?: string
  email: string
  uid?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  initialized: boolean
}

export interface ProjectState {
  selectedProject: Project | null
  allProjects: Project[]
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type?: 'delete' | 'remove' | 'archive' | 'complete' | 'cancel'
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  itemName?: string
  loading?: boolean
}

export interface ProjectCardProps {
  project: Project
  onAddTask?: (projectId: string | number) => void
}

export interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onProjectCreated: (project: Project) => void
}

export interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskCreated: (task: Task) => void
  projectId: string
  projectName?: string
}

export interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskUpdated: (task: Task) => void
  task: Task | null
}

// API Response Types
export interface ApiResponse<T> {
  success?: boolean
  message?: string
  error?: string
  details?: string
  data?: T
}

export interface ProjectsResponse extends ApiResponse<Project[]> {
  projects: Project[]
}

export interface TasksResponse extends ApiResponse<Task[]> {
  tasks: Task[]
}

export interface AuthResponse extends ApiResponse<User> {
  user?: User
}

// Form Data Types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
}

export interface ProjectFormData {
  name: string
  description: string
  status: string
  priority: string
  budget: number
}

export interface TaskFormData {
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  projectId: string
  projectName?: string
}