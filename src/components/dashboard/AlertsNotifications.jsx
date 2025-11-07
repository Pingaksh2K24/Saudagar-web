'use client'

export default function AlertsNotifications() {
  const alerts = [
    { 
      type: 'warning', 
      message: 'Agent Rajesh Kumar has high bet volume - ₹25,000 today',
      time: '5 min ago',
      priority: 'high'
    },
    { 
      type: 'info', 
      message: 'Milan Day game closing in 30 minutes',
      time: '10 min ago',
      priority: 'medium'
    },
    { 
      type: 'success', 
      message: 'All payouts for Kalyan game processed successfully',
      time: '15 min ago',
      priority: 'low'
    },
    { 
      type: 'error', 
      message: 'Agent connection lost - Mahesh Singh (Ganeshpur)',
      time: '20 min ago',
      priority: 'high'
    }
  ]

  const getAlertStyle = (type) => {
    switch(type) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50'
      case 'error': return 'border-l-red-500 bg-red-50'
      case 'success': return 'border-l-green-500 bg-green-50'
      case 'info': return 'border-l-blue-500 bg-blue-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return '⚠️'
      case 'error': return '🚨'
      case 'success': return '✅'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Alerts & Notifications</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.filter(a => a.priority === 'high').length} High Priority
        </span>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts.map((alert, index) => (
          <div key={index} className={`border-l-4 p-3 rounded-r-lg ${getAlertStyle(alert.type)}`}>
            <div className="flex items-start space-x-2">
              <span className="text-lg">{getIcon(alert.type)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
              {alert.priority === 'high' && (
                <span className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}