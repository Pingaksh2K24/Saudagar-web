'use client'
import { WhatsApp, OpenInNew, DesktopWindows } from '@mui/icons-material'

export default function WhatsAppPage() {
  const openWhatsAppDesktop = () => {
    window.location.href = 'whatsapp://'
  }

  const openWhatsAppWeb = () => {
    window.open('https://web.whatsapp.com', '_blank')
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center h-screen">
      <WhatsApp className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">WhatsApp</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Choose how you want to open WhatsApp
      </p>
      <div className="space-y-4">
        <button
          onClick={openWhatsAppDesktop}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center font-semibold w-full"
        >
          <DesktopWindows className="w-5 h-5 mr-2" />
          Open WhatsApp Desktop
        </button>
        <button
          onClick={openWhatsAppWeb}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center font-semibold w-full"
        >
          <WhatsApp className="w-5 h-5 mr-2" />
          Open WhatsApp Web
          <OpenInNew className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  )
}