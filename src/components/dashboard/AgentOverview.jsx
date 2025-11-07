'use client'

export default function AgentOverview() {
  const agents = [
    { id: 1, name: 'Rajesh Kumar', village: 'Rampur', status: 'active', bets: 45, collection: 12500 },
    { id: 2, name: 'Suresh Patel', village: 'Shivpur', status: 'active', bets: 32, collection: 8900 },
    { id: 3, name: 'Mahesh Singh', village: 'Ganeshpur', status: 'inactive', bets: 0, collection: 0 },
    { id: 4, name: 'Dinesh Yadav', village: 'Krishnapur', status: 'active', bets: 28, collection: 7600 },
    { id: 5, name: 'Rakesh Sharma', village: 'Hanumanpur', status: 'active', bets: 38, collection: 10200 }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Top Agents</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {agents.slice(0, 5).map((agent) => (
          <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {agent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">{agent.name}</p>
                <p className="text-xs text-gray-500">{agent.village}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-xs text-gray-600">{agent.bets} bets</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">₹{agent.collection.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}