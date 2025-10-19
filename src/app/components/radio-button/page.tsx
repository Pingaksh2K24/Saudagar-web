'use client'

interface RadioOption {
  value: string | number
  label: string
}

interface RadioButtonProps {
  options: RadioOption[]
  value: string | number
  onChange: (value: string | number) => void
  name: string
  label?: string
  disabled?: boolean
  error?: string
  className?: string
  direction?: 'horizontal' | 'vertical'
}

export default function RadioButton({
  options,
  value,
  onChange,
  name,
  label,
  disabled = false,
  error,
  className = '',
  direction = 'vertical'
}: RadioButtonProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className={`${direction === 'horizontal' ? 'flex space-x-4' : 'space-y-2'}`}>
        {options.map((option) => (
          <label 
            key={option.value} 
            className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className={`w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 focus:ring-2 ${className}`}
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}