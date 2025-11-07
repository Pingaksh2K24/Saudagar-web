'use client'
import { Casino } from '@mui/icons-material'

export default function NumberInput({ label, value, onChange, placeholder = "000", ...props }) {
  return (
    <div>
      <label className="flex items-center text-xs text-gray-600 mb-1">
        <Casino className="w-3 h-3 mr-1" />
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-center font-mono text-sm"
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}