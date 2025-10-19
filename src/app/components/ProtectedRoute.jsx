'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, hydrated, hydrate } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    hydrate()
  }, [])

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, hydrated, router])

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}