'use client'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  error?: string
  className?: string
}

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  className = ''
}: CheckboxProps) {
  return (
    <div className="space-y-2">
      <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={`w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 ${className}`}
        />
        {label && (
          <span className="ml-2 text-sm text-gray-700">{label}</span>
        )}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}