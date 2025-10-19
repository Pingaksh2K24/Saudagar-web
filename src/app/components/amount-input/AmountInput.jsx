'use client'
import { AttachMoney } from '@mui/icons-material'

export default function AmountInput({ label, value, onChange, placeholder = "₹10", ...props }) {
  return (
    <div>
      <label className="flex items-center text-xs text-gray-600 mb-1">
        <AttachMoney className="w-3 h-3 mr-1" />
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}