'use client'

export default function GameStatus() {
  const games = [
    { name: 'Milan Day', status: 'open', closeTime: '3:30 PM', bets: 234, amount: 45600 },
    { name: 'Kalyan', status: 'closed', result: '567', bets: 189, amount: 38900 },
    { name: 'Main Bazar', status: 'open', closeTime: '9:30 PM', bets: 156, amount: 32100 },
    { name: 'Milan Night', status: 'result-pending', closeTime: 'Closed', bets: 98, amount: 19800 }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-red-100 text-red-800'
      case 'result-pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Game Status</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{game.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}>
                {game.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Close Time:</span>
                <span className="font-medium">{game.closeTime}</span>
              </div>
              {game.result && (
                <div className="flex justify-between">
                  <span>Result:</span>
                  <span className="font-bold text-blue-600">{game.result}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Total Bets:</span>
                <span className="font-medium">{game.bets}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold text-green-600">₹{game.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}