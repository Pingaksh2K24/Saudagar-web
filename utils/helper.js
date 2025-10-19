// Capitalize first letter only
export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase()
}


// Capitalize first letter of string
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Capitalize each word in string
export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.split(' ').map(word => capitalize(word)).join(' ')
}

// Convert camelCase or snake_case to Title Case
export const toTitleCase = (str) => {
  if (!str) return ''
  return str
    .replace(/([A-Z])/g, ' $1') // camelCase to spaces
    .replace(/[_-]/g, ' ') // snake_case/kebab-case to spaces
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
    .trim()
}

// Truncate string with ellipsis
export const truncate = (str, length = 50) => {
  if (!str) return ''
  return str.length > length ? str.substring(0, length) + '...' : str
}

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

// Format date to readable string
export const formatDate = (date, format = 'default') => {
  if (!date) return 'N/A'
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  const options = {
    default: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { month: 'short', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }
  }
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.default)
}

// Get relative time (e.g., "2 days ago")
export const getRelativeTime = (date) => {
  if (!date) return 'Unknown'
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  
  return 'Just now'
}

// Check if date is today
export const isToday = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  const today = new Date()
  return dateObj.toDateString() === today.toDateString()
}

// Check if date is overdue
export const isOverdue = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj < today
}

// Get days until date
export const getDaysUntil = (date) => {
  if (!date) return null
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dateObj.setHours(0, 0, 0, 0)
  
  const diffTime = dateObj - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

// Format date for input field (YYYY-MM-DD)
export const formatDateForInput = (date) => {
  if (!date) return ''
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  return dateObj.toISOString().split('T')[0]
}