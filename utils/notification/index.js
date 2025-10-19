import { enqueueSnackbar } from 'notistack'

// Success notification
export const showSuccess = (message) => {
  enqueueSnackbar(message, {
    variant: 'success',
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    style: {
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      fontSize: '14px',
      fontWeight: '500'
    }
  })
}

// Error notification
export const showError = (message) => {
  enqueueSnackbar(message, {
    variant: 'error',
    autoHideDuration: 6000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    style: {
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
      fontSize: '14px',
      fontWeight: '500'
    }
  })
}

// Warning notification
export const showWarning = (message) => {
  enqueueSnackbar(message, {
    variant: 'warning',
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    style: {
      backgroundColor: '#F59E0B',
      color: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
      fontSize: '14px',
      fontWeight: '500'
    }
  })
}

// Info notification
export const showInfo = (message) => {
  enqueueSnackbar(message, {
    variant: 'info',
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    style: {
      backgroundColor: '#3B82F6',
      color: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      fontSize: '14px',
      fontWeight: '500'
    }
  })
}

// Custom notification with options
export const showNotification = (message, options = {}) => {
  const defaultOptions = {
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    style: {
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      fontSize: '14px',
      fontWeight: '500'
    }
  }
  
  enqueueSnackbar(message, { ...defaultOptions, ...options })
}