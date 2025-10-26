'use client'
import { useState } from 'react'
import BidDetailsModal from './BidDetailsModal'

export default function FilteredBidsTable({ selectedGame, selectedVillage }) {
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
  const allBids = [
    { id: 1, agent: 'Rajesh Kumar', village: 'rampur', game: 'milan-day', session: 'Open', bidType: 'Single Digit', number: '234', amount: 500, date: '15/01/2024', status: 'active' },
    { id: 2, agent: 'Suresh Patel', village: 'shivpur', game: 'kalyan', session: 'Close', bidType: 'Jodi Digit', number: '567', amount: 1000, date: '15/01/2024', status: 'active' },
    { id: 3, agent: 'Dinesh Yadav', village: 'krishnapur', game: 'main-bazar', session: 'Open', bidType: 'Single Panna', number: '890', amount: 750, date: '15/01/2024', status: 'active' },
    { id: 4, agent: 'Mahesh Singh', village: 'ganeshpur', game: 'milan-night', session: 'Close', bidType: 'Double Panna', number: '123', amount: 300, date: '14/01/2024', status: 'won' },
    { id: 5, agent: 'Rakesh Sharma', village: 'hanumanpur', game: 'rajdhani-day', session: 'Open', bidType: 'Triple Panna', number: '456', amount: 1200, date: '14/01/2024', status: 'lost' },
    { id: 6, agent: 'Amit Kumar', village: 'rampur', game: 'milan-day', session: 'Close', bidType: 'Half Sangam', number: '789', amount: 800, date: '15/01/2024', status: 'active' },
    { id: 7, agent: 'Vijay Singh', village: 'shivpur', game: 'kalyan', session: 'Open', bidType: 'Full Sangam', number: '345', amount: 600, date: '15/01/2024', status: 'active' },
    { id: 8, agent: 'Ravi Patel', village: 'laxmipur', game: 'main-bazar', session: 'Close', bidType: 'Jodi Digit', number: '678', amount: 900, date: '14/01/2024', status: 'won' },
    { id: 9, agent: 'Mohan Gupta', village: 'rampur', game: 'kalyan', session: 'Open', bidType: 'Single Digit', number: '123', amount: 400, date: '15/01/2024', status: 'active' },
    { id: 10, agent: 'Kiran Sharma', village: 'shivpur', game: 'milan-day', session: 'Close', bidType: 'Double Panna', number: '456', amount: 650, date: '15/01/2024', status: 'lost' },
    { id: 11, agent: 'Anil Verma', village: 'ganeshpur', game: 'main-bazar', session: 'Open', bidType: 'Triple Panna', number: '789', amount: 1100, date: '14/01/2024', status: 'won' },
    { id: 12, agent: 'Deepak Singh', village: 'krishnapur', game: 'milan-night', session: 'Close', bidType: 'Half Sangam', number: '234', amount: 850, date: '14/01/2024', status: 'active' },
    { id: 13, agent: 'Sanjay Kumar', village: 'hanumanpur', game: 'rajdhani-day', session: 'Open', bidType: 'Full Sangam', number: '567', amount: 950, date: '15/01/2024', status: 'active' },
    { id: 14, agent: 'Ramesh Patel', village: 'laxmipur', game: 'kalyan', session: 'Close', bidType: 'Single Panna', number: '890', amount: 700, date: '15/01/2024', status: 'lost' },
    { id: 15, agent: 'Vinod Yadav', village: 'rampur', game: 'milan-day', session: 'Open', bidType: 'Jodi Digit', number: '345', amount: 550, date: '14/01/2024', status: 'won' },
    { id: 16, agent: 'Ashok Gupta', village: 'shivpur', game: 'main-bazar', session: 'Close', bidType: 'Single Digit', number: '678', amount: 450, date: '14/01/2024', status: 'active' },
    { id: 17, agent: 'Prakash Singh', village: 'ganeshpur', game: 'milan-night', session: 'Open', bidType: 'Double Panna', number: '901', amount: 800, date: '15/01/2024', status: 'active' },
    { id: 18, agent: 'Manoj Kumar', village: 'krishnapur', game: 'rajdhani-day', session: 'Close', bidType: 'Triple Panna', number: '234', amount: 1300, date: '15/01/2024', status: 'lost' },
    { id: 19, agent: 'Santosh Patel', village: 'hanumanpur', game: 'kalyan', session: 'Open', bidType: 'Half Sangam', number: '567', amount: 750, date: '14/01/2024', status: 'won' },
    { id: 20, agent: 'Gopal Sharma', village: 'laxmipur', game: 'milan-day', session: 'Close', bidType: 'Full Sangam', number: '890', amount: 1000, date: '14/01/2024', status: 'active' },
    { id: 21, agent: 'Raman Singh', village: 'rampur', game: 'main-bazar', session: 'Open', bidType: 'Single Panna', number: '123', amount: 600, date: '15/01/2024', status: 'active' },
    { id: 22, agent: 'Sunil Gupta', village: 'shivpur', game: 'milan-night', session: 'Close', bidType: 'Jodi Digit', number: '456', amount: 900, date: '15/01/2024', status: 'lost' },
    { id: 23, agent: 'Ajay Kumar', village: 'ganeshpur', game: 'rajdhani-day', session: 'Open', bidType: 'Double Panna', number: '789', amount: 1150, date: '14/01/2024', status: 'won' },
    { id: 24, agent: 'Rohit Patel', village: 'krishnapur', game: 'kalyan', session: 'Close', bidType: 'Triple Panna', number: '234', amount: 850, date: '14/01/2024', status: 'active' },
    { id: 25, agent: 'Naveen Sharma', village: 'hanumanpur', game: 'milan-day', session: 'Open', bidType: 'Half Sangam', number: '567', amount: 700, date: '15/01/2024', status: 'active' },
    { id: 26, agent: 'Pankaj Singh', village: 'laxmipur', game: 'main-bazar', session: 'Close', bidType: 'Full Sangam', number: '890', amount: 1250, date: '15/01/2024', status: 'lost' },
    { id: 27, agent: 'Mukesh Kumar', village: 'rampur', game: 'milan-night', session: 'Open', bidType: 'Single Digit', number: '345', amount: 500, date: '14/01/2024', status: 'won' },
    { id: 28, agent: 'Jitendra Patel', village: 'shivpur', game: 'rajdhani-day', session: 'Close', bidType: 'Single Panna', number: '678', amount: 950, date: '14/01/2024', status: 'active' }
  ]

  const filteredBids = allBids.filter(bid => {
    const gameMatch = !selectedGame || selectedGame === 'all' || bid.game === selectedGame
    const villageMatch = !selectedVillage || selectedVillage === 'all' || bid.village === selectedVillage
    return gameMatch && villageMatch
  })

  const totalPages = Math.ceil(filteredBids.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentBids = filteredBids.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
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

  if (!selectedGame && !selectedVillage) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Select a game or village to view filtered bids</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Filtered Bids 
          {selectedGame && selectedGame !== 'all' && ` - ${getGameName(selectedGame)}`}
          {selectedVillage && selectedVillage !== 'all' && ` - ${getVillageName(selectedVillage)}`}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {filteredBids.length} bids found
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Bids</p>
          <p className="text-xl font-bold text-blue-800">{filteredBids.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Total Amount</p>
          <p className="text-xl font-bold text-green-800">₹{filteredBids.reduce((sum, bid) => sum + bid.amount, 0).toLocaleString()}</p>
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
                <td className="py-3 px-2 text-sm font-medium text-gray-800">{bid.agent}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{getGameName(bid.game)}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{bid.session}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{bid.bidType}</td>
                <td className="py-3 px-2 text-sm font-mono font-bold text-blue-600">{bid.number}</td>
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
            Showing {startIndex + 1} to {Math.min(endIndex, filteredBids.length)} of {filteredBids.length} bids
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