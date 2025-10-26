'use client'
import { SVGIcons } from '../../../../utils/svgConstants'

export default function StatsCards({ data = {} }) {
  const {
    totalAgents = 0,
    activeAgents = 0,
    totalBets = 0,
    todayCollection = 0,
    pendingPayouts = 0,
    netProfit = 0
  } = data

  const stats = [
    {
      title: 'Total Agents',
      value: totalAgents,
      bgColor: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Active Agents',
      value: activeAgents,
      bgColor: 'from-green-500 to-green-600',
      textColor: 'text-green-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Total Bets Today',
      value: totalBets,
      bgColor: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Today's Collection",
      value: `₹${todayCollection.toLocaleString()}`,
      bgColor: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Pending Payouts',
      value: `₹${pendingPayouts.toLocaleString()}`,
      bgColor: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Net Profit',
      value: `₹${netProfit.toLocaleString()}`,
      bgColor: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${stat.textColor} text-xs font-medium mb-1`}>{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}