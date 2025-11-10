import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { setUserSession, getUserSession, clearUserSession, isUserLoggedIn } from '../utils/cookies'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      hydrated: false,
      
      hydrate: () => {
        if (typeof window !== 'undefined') {
          const session = getUserSession()
          if (session && session.token) {
            set({ 
              user: session.user, 
              token: session.token,
              isAuthenticated: true, 
              hydrated: true 
            })
            return
          }
        }
        set({ hydrated: true })
      },
      
      logout: () => {
        clearUserSession()
        localStorage.removeItem('auth-storage')
        set({ user: null, token: null, isAuthenticated: false, loading: false })
      },
      
      login: async (email, password, rememberMe = true) => {
        set({ loading: true })
        try {
          // Replace with your actual API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          
          if (!response.ok) throw new Error('Login failed')
          
          const data = await response.json()
          const { user, token } = data
          
          if (rememberMe) {
            setUserSession(token, user)
          }
          
          set({ user, token, isAuthenticated: true, loading: false })
          return { success: true }
        } catch (error) {
          set({ loading: false })
          return { success: false, error: error.message || 'Login failed' }
        }
      },
      
      checkAuth: () => {
        if (typeof window !== 'undefined') {
          const isLoggedIn = isUserLoggedIn()
          const session = getUserSession()
          
          if (isLoggedIn && session) {
            set({ 
              user: session.user, 
              token: session.token,
              isAuthenticated: true 
            })
            return true
          }
        }
        return false
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)