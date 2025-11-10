'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/AuthProvider'

export default function AuthGuard({ children }) {
  const { isAuthenticated, hydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, hydrated, router])

  if (!hydrated) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}