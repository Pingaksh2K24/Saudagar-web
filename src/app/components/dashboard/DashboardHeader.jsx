'use client'

export default function DashboardHeader({ onNewProject }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onNewProject}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            + New Game
          </button>
        </div>
      </div>
    </div>
  )
}