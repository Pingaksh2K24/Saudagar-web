'use client'

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  className?: string
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  error,
  icon,
  className = ''
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 ${
            error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-200 focus:border-red-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
          suppressHydrationWarning
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </div>
  )
}