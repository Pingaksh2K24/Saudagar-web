'use client'

interface Option {
  value: string | number
  label: string
  icon?: React.ReactNode
}

interface DropdownProps {
  options: Option[]
  value: string | number
  onChange: (value: string | number) => void
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
}

export default function Dropdown({
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  error,
  className = ''
}: DropdownProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white focus:from-white focus:to-white transition-all duration-300 text-gray-800 appearance-none font-medium shadow-lg hover:shadow-xl ${
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
              : 'border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'} ${className}`}
          style={{
            backgroundImage: 'none',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          suppressHydrationWarning
        >
          <option value="" disabled style={{
            backgroundColor: '#f8fafc',
            color: '#94a3b8',
            padding: '12px 16px',
            fontSize: '14px'
          }}>{placeholder}</option>
          {(options || []).map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              style={{
                backgroundColor: '#ffffff',
                color: '#1f2937',
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: '500',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
            >
              {option.icon ? ` ${option.label}` : option.label}
            </option>
          ))}
        </select>
        <style jsx>{`
          select option:hover {
            background-color: #dbeafe !important;
            color: #1d4ed8 !important;
          }
          select option:checked {
            background-color: #3b82f6 !important;
            color: white !important;
          }
        `}</style>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}