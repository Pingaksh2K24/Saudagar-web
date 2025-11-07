'use client'
import Header from '../../components/layout/header/page'
import Sidebar from '../../components/layout/sidebar/page'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="dashboard-layout">
        {children}
      </main>
    </div>
  )
}