'use client';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  min?: string;
  max?: string;
  className?: string;
}

export default function DateInput({
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  error,
  min,
  max,
  className = '',
}: DateInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full px-4 py-2 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
            error
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-red-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
