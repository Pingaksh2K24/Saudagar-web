import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '',
  timeout: 30000, // Increased to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.code === 'ECONNABORTED' && error.config && !error.config.__isRetryRequest) {
      error.config.__isRetryRequest = true
      error.config.timeout = 45000 // Increase timeout for retry
      return api.request(error.config)
    }
    
    // Handle common errors
    if (error.response?.status === 401) {
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// API methods
export const apiClient = {
  auth: {
    login: (email, password) => api.post('/api/auth/login', { email, password }),
    register: (email, password, name, mobile, role) => {
      const roleId = role === 'admin' ? 2 : role === 'moderator' ? 3 : 1;
      return api.post('/api/auth/register', {
        full_name: name,
        phone: mobile,
        role_id: roleId,
        email: email,
        password: password
      });
    },
    verify: () => api.get('/api/auth/verify'),
    logout: () => api.post('/api/auth/logout'),
  },

  // Projects APIs
  projects: {
    getAll: () => api.get('/api/projects'),
    create: (projectData) => api.post('/api/projects', projectData),
  },

  // Tasks APIs
  tasks: {
    getAll: () => api.get('/api/tasks'),
    getByProject: (projectId) => api.get(`/api/tasks?projectId=${projectId}`),
    create: (taskData) => api.post('/api/tasks', taskData),
    update: (taskData) => api.put('/api/tasks', taskData),
    delete: (taskId) => api.delete(`/api/tasks?id=${taskId}`),
  },

  // Games APIs
  games: {
    getAll: () => api.get('/api/games/all'),
    getById: (gameId) => api.get(`/api/games/${gameId}`),
    add: (gameData) => api.post('/api/games/add', gameData),
    update: (gameId, gameData) => api.put(`/api/games/update/${gameId}`, gameData),
  },
}
export default api