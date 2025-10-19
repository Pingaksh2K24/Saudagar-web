import { create } from 'zustand'
import { apiClient } from '../../../utils/api'

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  hydrated: false,
  
  hydrate: () => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth-user')
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          set({ user, isAuthenticated: true, hydrated: true })
          return
        } catch (error) {
          localStorage.removeItem('auth-user')
        }
      }
    }
    set({ hydrated: true })
  },
  
  logout: async () => {
    try {
      await apiClient.auth.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    localStorage.removeItem('auth-user')
    set({ user: null, isAuthenticated: false, loading: false })
  },
  
  login: async (email, password) => {
    set({ loading: true })
    try {
      const response = await apiClient.auth.login(email, password)
      const user = response.data.user
      localStorage.setItem('auth-user', JSON.stringify(user))
      set({ user, isAuthenticated: true, loading: false })
      return { success: true }
    } catch (error) {
      set({ loading: false })
      return { success: false, error: error.response?.data?.error || 'Login failed' }
    }
  },
  
  register: async (email, password, name, mobile, role) => {
    set({ loading: true })
    try {
      await apiClient.auth.register(email, password, name, mobile, role)
      set({ loading: false })
      return { success: true }
    } catch (error) {
      set({ loading: false })
      return { success: false, error: error.response?.data?.error || 'Registration failed' }
    }
  }
}))