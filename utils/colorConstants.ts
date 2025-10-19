// Color Constants for Zignuts Taskora Project

// Primary Brand Colors
export const BRAND_COLORS = {
  primary: 'bg-indigo-600',
  primaryHover: 'hover:bg-indigo-700',
  primaryLight: 'bg-indigo-100',
  primaryText: 'text-indigo-600',
  secondary: 'bg-red-500',
  secondaryHover: 'hover:bg-red-600',
  accent: 'bg-purple-600',
  accentHover: 'hover:bg-purple-700'
}

// Status Colors
export const STATUS_COLORS = {
  success: 'bg-green-600',
  successHover: 'hover:bg-green-700',
  successLight: 'bg-green-100',
  successText: 'text-green-800',
  warning: 'bg-yellow-500',
  warningHover: 'hover:bg-yellow-600',
  warningLight: 'bg-yellow-100',
  warningText: 'text-yellow-800',
  danger: 'bg-red-600',
  dangerHover: 'hover:bg-red-700',
  dangerLight: 'bg-red-100',
  dangerText: 'text-red-800',
  info: 'bg-blue-600',
  infoHover: 'hover:bg-blue-700',
  infoLight: 'bg-blue-100',
  infoText: 'text-blue-800'
}

// Priority Colors
export const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-orange-100 text-orange-800',
  low: 'bg-blue-100 text-blue-800'
}

// Neutral Colors
export const NEUTRAL_COLORS = {
  white: 'bg-white',
  gray50: 'bg-gray-50',
  gray100: 'bg-gray-100',
  gray200: 'bg-gray-200',
  gray300: 'bg-gray-300',
  gray600: 'bg-gray-600',
  gray700: 'bg-gray-700',
  gray800: 'bg-gray-800',
  gray900: 'bg-gray-900',
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textMuted: 'text-gray-500',
  textLight: 'text-gray-400'
}

// Gradient Colors
export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  primaryBr: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  success: 'bg-gradient-to-r from-green-500 to-green-600',
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  danger: 'bg-gradient-to-r from-red-500 to-red-600',
  info: 'bg-gradient-to-r from-blue-500 to-blue-600',
  purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
  ocean: 'bg-gradient-to-r from-blue-400 to-cyan-500',
  sunset: 'bg-gradient-to-r from-orange-400 to-pink-500',
  forest: 'bg-gradient-to-r from-green-400 to-emerald-500'
}

// Text Gradients
export const TEXT_GRADIENTS = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent',
  success: 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent',
  warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent',
  danger: 'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'
}

// Border Colors
export const BORDER_COLORS = {
  default: 'border-gray-200',
  light: 'border-gray-100',
  primary: 'border-indigo-200',
  success: 'border-green-200',
  warning: 'border-yellow-200',
  danger: 'border-red-200'
}

// Shadow Colors
export const SHADOWS = {
  sm: 'shadow-sm',
  default: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  primary: 'shadow-lg shadow-indigo-500/25',
  success: 'shadow-lg shadow-green-500/25',
  danger: 'shadow-lg shadow-red-500/25'
}

// Hover Effects
export const HOVER_EFFECTS = {
  scale: 'hover:scale-105',
  shadow: 'hover:shadow-lg',
  lift: 'hover:shadow-xl hover:-translate-y-1',
  glow: 'hover:shadow-lg hover:shadow-indigo-500/25'
}

// Complete Color Palette Export
export const COLORS = {
  brand: BRAND_COLORS,
  status: STATUS_COLORS,
  priority: PRIORITY_COLORS,
  neutral: NEUTRAL_COLORS,
  gradients: GRADIENTS,
  textGradients: TEXT_GRADIENTS,
  borders: BORDER_COLORS,
  shadows: SHADOWS,
  hover: HOVER_EFFECTS
}