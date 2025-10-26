'use client'

export default function LiveBetsTable() {
  const liveBets = [
    { id: 1, agent: 'Rajesh Kumar', village: 'Rampur', game: 'Milan Day', number: '234', amount: 500, time: '2:45 PM' },
    { id: 2, agent: 'Suresh Patel', village: 'Shivpur', game: 'Kalyan', number: '567', amount: 1000, time: '2:43 PM' },
    { id: 3, agent: 'Dinesh Yadav', village: 'Krishnapur', game: 'Main Bazar', number: '890', amount: 750, time: '2:41 PM' },
    { id: 4, agent: 'Mahesh Singh', village: 'Ganeshpur', game: 'Milan Night', number: '123', amount: 300, time: '2:40 PM' },
    { id: 5, agent: 'Rakesh Sharma', village: 'Hanumanpur', game: 'Rajdhani Day', number: '456', amount: 1200, time: '2:38 PM' }
  ]

  const totalBets = liveBets.length
  const totalAmount = liveBets.reduce((sum, bet) => sum + bet.amount, 0)
  const avgBetAmount = totalAmount / totalBets

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Live Bets</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Bets</p>
          <p className="text-xl font-bold text-blue-800">{totalBets}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Total Amount</p>
          <p className="text-xl font-bold text-green-800">₹{totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Avg Bet</p>
          <p className="text-xl font-bold text-purple-800">₹{Math.round(avgBetAmount)}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Agent</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Village</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Game</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Number</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody>
            {liveBets.map((bet) => (
              <tr key={bet.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm font-medium text-gray-800">{bet.agent}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{bet.village}</td>
                <td className="py-3 px-2 text-sm text-gray-600">{bet.game}</td>
                <td className="py-3 px-2 text-sm font-mono font-bold text-blue-600">{bet.number}</td>
                <td className="py-3 px-2 text-sm font-semibold text-green-600">₹{bet.amount}</td>
                <td className="py-3 px-2 text-sm text-gray-500">{bet.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">Showing 5 of 247 bets</p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
          <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
          <span className="px-3 py-1 text-sm text-gray-600">2</span>
          <span className="px-3 py-1 text-sm text-gray-600">3</span>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  )
}