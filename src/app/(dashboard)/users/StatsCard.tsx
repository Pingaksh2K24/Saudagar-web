'use client'
import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  gradient: string
}

export default function StatsCard({ title, value, icon, gradient }: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  )
}