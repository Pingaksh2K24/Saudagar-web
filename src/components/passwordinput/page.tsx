'use client';

import { useState } from 'react';
import { SVGIcons } from '@/utils/svgConstants';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 pr-12"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          suppressHydrationWarning
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          suppressHydrationWarning
        >
          {showPassword ? (
            <SVGIcons.EyeClosed className="w-5 h-5" />
          ) : (
            <SVGIcons.EyeOpen className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </div>
  );
}
