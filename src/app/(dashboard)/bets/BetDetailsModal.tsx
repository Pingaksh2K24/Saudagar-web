'use client'
import { Close, AttachMoney, Person, SportsEsports, Schedule } from '@mui/icons-material'

interface BetDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  bet: {
    id: number
    user_name: string
    game_name: string
    bet_type: string
    bet_number: string
    amount: number
    status: string
    created_at: string
  } | null
}

export default function BetDetailsModal({ isOpen, onClose, bet }: BetDetailsModalProps) {
  if (!isOpen || !bet) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-2 w-full max-w-5xl max-h-[500px] overflow-y-auto border border-gray-100 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
              <AttachMoney className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bet Details</h2>
              <p className="text-sm text-gray-500">Complete betting information</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
            <Close className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <Person className="w-8 h-8 mb-3" />
            <p className="text-blue-100 text-xs font-medium mb-1">USER</p>
            <p className="font-bold text-lg">{bet.user_name}</p>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <SportsEsports className="w-8 h-8 mb-3" />
            <p className="text-emerald-100 text-xs font-medium mb-1">GAME</p>
            <p className="font-bold text-lg">{bet.game_name}</p>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <Schedule className="w-8 h-8 mb-3" />
            <p className="text-purple-100 text-xs font-medium mb-1">BET ID</p>
            <p className="font-bold text-lg">#{bet.id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-1">
          <div className="text-center p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-indigo-600 font-bold text-sm">T</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-2">TYPE</p>
            <p className="font-bold capitalize text-gray-900 text-lg">{bet.bet_type}</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-600 font-bold text-sm">#</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-2">NUMBER</p>
            <p className="font-mono font-bold text-2xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{bet.bet_number}</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AttachMoney className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 font-medium mb-2">AMOUNT</p>
            <p className="font-bold text-2xl text-green-600">₹{bet.amount}</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-600 font-bold text-sm">S</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-2">STATUS</p>
            <span className={`px-4 py-2 text-sm font-bold rounded-full ${getStatusColor(bet.status)}`}>
              {bet.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center mb-3">
            <Schedule className="w-5 h-5 text-gray-600 mr-2" />
            <p className="text-sm text-gray-600 font-semibold">BET TIMESTAMP</p>
          </div>
          <p className="font-bold text-lg text-gray-900">{new Date(bet.created_at).toLocaleString()}</p>
        </div>
        
        <div className="mt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}