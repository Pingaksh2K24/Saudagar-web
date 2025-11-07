'use client'
import { SnackbarProvider } from 'notistack'

export default function NotificationProvider({ children }) {
  return (
    <SnackbarProvider 
      maxSnack={4}
      dense={false}
      preventDuplicate
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}

    >
      {children}
    </SnackbarProvider>
  )
}