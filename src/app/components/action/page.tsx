'use client'
import { Visibility, Edit, Delete } from '@mui/icons-material'

interface ActionButtonProps {
  onClick: () => void
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export function ViewButton({ onClick, size = 'medium', disabled = false }: ActionButtonProps) {
  const sizeClasses = {
    small: 'p-1.5 w-7 h-7',
    medium: 'p-2 w-8 h-8', 
    large: 'p-2.5 w-9 h-9'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:shadow-md transform hover:scale-105 transition-all duration-200 border border-blue-200 flex items-center justify-center ${
        disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'active:scale-95'
      }`}
      title="View Details"
    >
      <Visibility className="w-3 h-3" />
    </button>
  )
}

export function EditButton({ onClick, size = 'medium', disabled = false }: ActionButtonProps) {
  const sizeClasses = {
    small: 'p-1.5 w-7 h-7',
    medium: 'p-2 w-8 h-8',
    large: 'p-2.5 w-9 h-9'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 hover:shadow-md transform hover:scale-105 transition-all duration-200 border border-emerald-200 flex items-center justify-center ${
        disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'active:scale-95'
      }`}
      title="Edit Record"
    >
      <Edit className="w-3 h-3" />
    </button>
  )
}

export function DeleteButton({ onClick, size = 'medium', disabled = false }: ActionButtonProps) {
  const sizeClasses = {
    small: 'p-1.5 w-7 h-7',
    medium: 'p-2 w-8 h-8',
    large: 'p-2.5 w-9 h-9'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:shadow-md transform hover:scale-105 transition-all duration-200 border border-red-200 flex items-center justify-center ${
        disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'active:scale-95'
      }`}
      title="Delete Record"
    >
      <Delete className="w-3 h-3" />
    </button>
  )
}

export default function ActionButtons() {
  return null
}