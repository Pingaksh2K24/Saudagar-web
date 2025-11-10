'use client'
import { createContext, useContext, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default function AuthProvider({ children }) {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    hydrated,
    login, 
    logout, 
    hydrate,
    checkAuth 
  } = useAuthStore()

  useEffect(() => {
    if (!hydrated) {
      hydrate()
      checkAuth()
    }
  }, [hydrated, hydrate, checkAuth])

  const value = {
    user,
    isAuthenticated,
    loading,
    hydrated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}