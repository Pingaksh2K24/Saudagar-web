'use client'

export default function TopNumbers() {
  const topNumbers = [
    { number: '234', bets: 45, amount: 22500, percentage: 18.2 },
    { number: '567', bets: 38, amount: 19000, percentage: 15.4 },
    { number: '890', bets: 32, amount: 16000, percentage: 12.9 },
    { number: '123', bets: 28, amount: 14000, percentage: 11.3 },
    { number: '456', bets: 25, amount: 12500, percentage: 10.1 }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Played Numbers</h3>
      
      <div className="space-y-3">
        {topNumbers.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                #{index + 1}
              </div>
              <div>
                <p className="font-mono font-bold text-lg text-gray-800">{item.number}</p>
                <p className="text-xs text-gray-500">{item.bets} bets</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-green-600">₹{item.amount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}