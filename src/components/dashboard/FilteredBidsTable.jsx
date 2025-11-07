'use client'
import { useState } from 'react'
import BidDetailsModal from './BidDetailsModal'

export default function FilteredBidsTable({ selectedGame, selectedVillage, adminBids, pagination = {}, onPageChange }) {
  const [selectedBid, setSelectedBid] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10
  
  const handleViewBid = (bid) => {
    setSelectedBid(bid)
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBid(null)
  }


  const allBidsData = Array.isArray(adminBids) ? adminBids : []
  
  const filteredBids = allBidsData

  const totalRecords = pagination.total || filteredBids.length
  const totalPages = pagination.total_pages || Math.ceil(totalRecords / recordsPerPage)
  const currentBids = filteredBids

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (onPageChange) {
      onPageChange(page)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      if (onPageChange) {
        onPageChange(newPage)
      }
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      if (onPageChange) {
        onPageChange(newPage)
      }
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'won': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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



  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Filtered Bids 
          {/* {selectedGame && selectedGame !== 'all' && ` - ${getGameName(selectedGame)}`} */}
          {/* {selectedVillage && selectedVillage !== 'all' && ` - ${getVillageName(selectedVillage)}`} */}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {filteredBids.length} bids found
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Bids</p>
          <p className="text-xl font-bold text-blue-800">{pagination.total}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Total Amount</p>
          <p className="text-xl font-bold text-green-800">₹{pagination.total_amount}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Active Bids</p>
          <p className="text-xl font-bold text-purple-800">{filteredBids.filter(bid => bid.status === 'active').length}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Village</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Agent</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Game</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Session</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Bid Type</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Number</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBids.map((bid) => (
              <tr key={bid.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm text-gray-600">{getVillageName(bid.village)}</td>
                <td className="py-3 px-2 text-sm font-medium text-gray-800">{bid.full_name}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{getGameName(bid.game_name)}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{bid.session_type}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{bid.bid_type_name}</td>
                <td className="py-3 px-2 text-sm font-mono font-bold text-blue-600">{bid.bid_number}</td>
                <td className="py-3 px-2 text-sm font-semibold text-green-600 text-right">₹{bid.amount}</td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-1 capitalize rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                    {bid.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-500">{bid.date}</td>
                <td className="py-3 px-2 text-center">
                  <button 
                    onClick={() => handleViewBid(bid)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredBids.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No bids found for selected filters</p>
        </div>
      )}
      
      {filteredBids.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} bids
          </p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      <BidDetailsModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        bidData={selectedBid}
      />
    </div>
  )
}