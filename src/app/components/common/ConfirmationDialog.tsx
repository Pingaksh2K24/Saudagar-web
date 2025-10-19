'use client'
import Modal from '../Modal'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ArchiveIcon from '@mui/icons-material/Archive'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import { ConfirmationDialogProps } from '../../../types'

interface ConfirmationType {
  title: string
  message: string
  confirmText: string
  confirmClass: string
  icon: React.ReactNode
}

const CONFIRMATION_TYPES: Record<string, ConfirmationType> = {
  delete: {
    title: 'Delete Confirmation',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    confirmClass: 'bg-red-600 hover:bg-red-700 text-white',
    icon: <DeleteIcon className="text-red-600" />
  },
  remove: {
    title: 'Remove Confirmation',
    message: 'Are you sure you want to remove this item?',
    confirmText: 'Remove',
    confirmClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    icon: <RemoveCircleIcon className="text-orange-600" />
  },
  archive: {
    title: 'Archive Confirmation',
    message: 'Are you sure you want to archive this item?',
    confirmText: 'Archive',
    confirmClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    icon: <ArchiveIcon className="text-yellow-600" />
  },
  complete: {
    title: 'Complete Confirmation',
    message: 'Are you sure you want to mark this as complete?',
    confirmText: 'Complete',
    confirmClass: 'bg-green-600 hover:bg-green-700 text-white',
    icon: <CheckCircleIcon className="text-green-600" />
  },
  cancel: {
    title: 'Cancel Confirmation',
    message: 'Are you sure you want to cancel this action? Any unsaved changes will be lost.',
    confirmText: 'Cancel',
    confirmClass: 'bg-gray-600 hover:bg-gray-700 text-white',
    icon: <WarningIcon className="text-gray-600" />
  }
}

export default function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type = 'delete',
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  itemName,
  loading = false
}: ConfirmationDialogProps) {
  const config = CONFIRMATION_TYPES[type] || CONFIRMATION_TYPES.delete
  
  const finalTitle = title || config.title
  const finalMessage = message || (itemName ? 
    config.message.replace('this item', `"${itemName}"`) : 
    config.message
  )
  const finalConfirmText = confirmText || config.confirmText

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
          {config.icon}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {finalTitle}
        </h3>
        
        {/* Message */}
        <p className="text-sm text-gray-500 mb-6">
          {finalMessage}
        </p>
        
        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-lg disabled:opacity-50 transition-colors ${config.confirmClass}`}
          >
            {loading ? 'Processing...' : finalConfirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Export confirmation types for easy access
export { CONFIRMATION_TYPES }