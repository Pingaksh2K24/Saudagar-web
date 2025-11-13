'use client'
import moment from "moment"

export default function BidDetailsModal({ isOpen, onClose, bidData }) {
  if (!isOpen || !bidData) return null

  const getGameName = (gameKey) => {
    const gameNames = {
      'milan-day': 'Milan Day',
      'kalyan': 'Kalyan',
      'main-bazar': 'Main Bazar',
      'milan-night': 'Milan Night',
      'rajdhani-day': 'Rajdhani Day'
    }
    return gameNames[gameKey] || gameKey
  }

  const getVillageName = (villageKey) => {
    const villageNames = {
      'rampur': 'Rampur',
      'shivpur': 'Shivpur',
      'ganeshpur': 'Ganeshpur',
      'krishnapur': 'Krishnapur',
      'hanumanpur': 'Hanumanpur',
      'laxmipur': 'Laxmipur'
    }
    return villageNames[villageKey] || villageKey
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'won': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl h-[500px] overflow-y-auto shadow-2xl border border-gray-100 transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-50 to-purple-50 -m-6 p-4 rounded-t-2xl border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bid Details</h2>
              <p className="text-xs text-gray-500">Complete bid information</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold mb-1">Bid ID</p>
              <p className="text-sm font-bold text-blue-800">#{bidData.id}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
              <p className="text-xs text-gray-600 font-semibold mb-1">Agent</p>
              <p className="text-sm font-bold text-gray-800">{bidData.full_name}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-purple-200">
              <p className="text-xs text-purple-600 font-semibold mb-1">Village</p>
              <p className="text-sm font-bold text-purple-800">{getVillageName(bidData.village)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-green-200">
              <p className="text-xs text-green-600 font-semibold mb-1">Game</p>
              <p className="text-sm font-bold text-green-800">{getGameName(bidData.game_name)}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-orange-200">
              <p className="text-xs text-orange-600 font-semibold mb-1">Session</p>
              <p className="text-sm font-bold text-orange-800">{bidData.session_type}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-indigo-200">
              <p className="text-xs text-indigo-600 font-semibold mb-1">Bid Type</p>
              <p className="text-sm font-bold text-indigo-800">{bidData.bid_type_name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-cyan-200">
              <p className="text-xs text-cyan-600 font-semibold mb-1">Number</p>
              <p className="text-lg font-mono font-bold text-cyan-800">{bidData.bid_number}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-emerald-200">
              <p className="text-xs text-emerald-600 font-semibold mb-1">Bet Amount</p>
              <p className="text-lg font-bold text-emerald-800">₹{Number(bidData.amount).toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-rose-200">
              <p className="text-xs text-rose-600 font-semibold mb-1">Date</p>
              <p className="text-sm font-bold text-rose-800">{moment(bidData.bid_date).format('DD MMM YYYY') || '-  '}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-yellow-200">
              <p className="text-xs text-yellow-600 font-semibold mb-1">Status</p>
              <span className={`inline-block px-3 py-1 capitalize rounded-full text-xs font-bold shadow-sm ${getStatusColor(bidData.status)}`}>
                {bidData.status}
              </span>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-pink-200">
              <p className="text-xs text-pink-600 font-semibold mb-1">Winning Amount</p>
              <p className="text-sm font-bold text-pink-800">{bidData.winning_amount? `₹${bidData.winning_amount}` : '-'}</p>
            </div>
          </div>
          
          {bidData.status === 'won' && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border-2 border-green-300 shadow-lg">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center bg-white p-2 rounded-lg shadow-sm">
                  <p className="text-xs text-green-600 font-bold mb-1">Won Amount</p>
                  <p className="text-lg font-bold text-green-800">₹{bidData.winning_amount ? Number(bidData.winning_amount).toLocaleString() : (Number(bidData.amount) * 9).toLocaleString()}</p>
                </div>
                <div className="text-center bg-white p-2 rounded-lg shadow-sm">
                  <p className="text-xs text-green-600 font-bold mb-1">Profit</p>
                  <p className="text-lg font-bold text-green-800">₹{bidData.winning_amount ? (Number(bidData.winning_amount) - Number(bidData.amount)).toLocaleString() : (Number(bidData.amount) * 8).toLocaleString()}</p>
                </div>
                <div className="text-center bg-white p-2 rounded-lg shadow-sm">
                  <p className="text-xs text-green-600 font-bold mb-1">Result</p>
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-bold text-green-800">WON</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-200">
         
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-8 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
            Print
          </button>
          <button 
            onClick={onClose}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-2 px-8 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}