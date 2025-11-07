'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Dashboard, SportsEsports, EmojiEvents, AttachMoney, People, AccountBalance,
  Settings, Assessment, AdminPanelSettings, Notifications, Logout, Add,
  List, Schedule, BarChart, Search, EmojiEventsOutlined, Cancel, AccessTime,
  AccountBalanceWallet, Block, TrendingUp, CreditCard, GetApp, Upload,
  Receipt, Rule, Timer, Message, Security, PhoneAndroid, DateRange,
  TrendingDown, Group, SupervisorAccount, PersonAdd, Assignment, VpnKey,
  NotificationImportant, Announcement, History, ExpandMore, ChevronRight, WhatsApp
} from '@mui/icons-material'
import ConfirmDialog from '@/components/confirm-dialog/page'

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const isParentActive = (menuPaths: string[]) => {
    return menuPaths.some(path => pathname.startsWith(path))
  }

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true)
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
      window.location.href = '/'
    } finally {
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
    }
  }

  return (
    <aside className="sidebar-fixed border-r bg-gray-900 text-white h-screen overflow-y-auto scrollbar-hide">
      <div className="p-4">
        <h2 className="text-xl text-red-500 font-bold mb-6">Saudagar Admin</h2>
        <nav className="space-y-1">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${isActive('/dashboard') ? 'bg-red-500' : 'text-gray-300 hover:bg-gray-800'
              }`}
          >
            <Dashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>

          {/* Games Management */}
          <div>
            <button
              onClick={() => toggleMenu('games')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/games']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <SportsEsports className="w-4 h-4 mr-2" />
                Games Management
              </div>
              {expandedMenus.includes('games') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('games') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/games/list" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/games/list') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <List className="w-3 h-3 mr-2 inline" /> All Games List
                </Link>
                <Link href="/games/rates" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/games/rates') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <AttachMoney className="w-3 h-3 mr-2 inline" /> Game Rates
                </Link>
                {/* <Link href="/games/status" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/games/status') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <BarChart className="w-3 h-3 mr-2 inline" /> Game Status
                </Link> */}
              </div>
            )}
          </div>

          {/* Results Management */}
          <div>
            <button
              onClick={() => toggleMenu('results')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/results']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <EmojiEvents className="w-4 h-4 mr-2" />
                Results Management
              </div>
              {expandedMenus.includes('results') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('results') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/results/declare" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/results/declare') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <DateRange className="w-3 h-3 mr-2 inline" /> Declare Result
                </Link>
                <Link href="/results/view" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/results/view') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <List className="w-3 h-3 mr-2 inline" /> View All Results
                </Link>
              </div>
            )}
          </div>

          {/* Bets Management */}
          <div>
            <button
              onClick={() => toggleMenu('bets')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/bets']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <AttachMoney className="w-4 h-4 mr-2" />
                Bids Management
              </div>
              {expandedMenus.includes('bets') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('bets') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/bets/all" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/bets/all') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <List className="w-3 h-3 mr-2 inline" /> All Bids List
                </Link>
              </div>
            )}
          </div>

          {/* Users Management */}
          <div>
            <button
              onClick={() => toggleMenu('users')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/users']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <People className="w-4 h-4 mr-2" />
                Users Management
              </div>
              {expandedMenus.includes('users') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('users') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/users/all" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/users/all') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Group className="w-3 h-3 mr-2 inline" /> All Users
                </Link>
                {/* <Link href="/users/wallet" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/users/wallet') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <AccountBalanceWallet className="w-3 h-3 mr-2 inline" /> Wallet Details
                </Link> */}
                <Link href="/users/activity" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/users/activity') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <TrendingUp className="w-3 h-3 mr-2 inline" /> User Activity Logs
                </Link>
              </div>
            )}
          </div>

          {/* Transactions */}
          <div>
            <button
              onClick={() => toggleMenu('transactions')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/transactions']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <AccountBalance className="w-4 h-4 mr-2" />
                Transactions
              </div>
              {expandedMenus.includes('transactions') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('transactions') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/transactions/all" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/transactions/all') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <CreditCard className="w-3 h-3 mr-2 inline" /> All Transactions
                </Link>
                <Link href="/transactions/reports" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/transactions/reports') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Receipt className="w-3 h-3 mr-2 inline" /> Transaction Reports
                </Link>
                <Link href="/transactions/receipts" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/transactions/receipts') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Assignment className="w-3 h-3 mr-2 inline" /> All Receipts
                </Link>
              </div>
            )}
          </div>

          {/* Settings  - Will use in Future - Prasad - 04-11-2025*/}
          {/* <div>
            <button
              onClick={() => toggleMenu('settings')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/settings']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </div>
              {expandedMenus.includes('settings') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('settings') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/settings/game-rules" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/settings/game-rules') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Rule className="w-3 h-3 mr-2 inline" /> Game Rules & Payout
                </Link>
                <Link href="/settings/security" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/settings/security') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Security className="w-3 h-3 mr-2 inline" /> Security & Access
                </Link>
                <Link href="/settings/app-info" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/settings/app-info') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <PhoneAndroid className="w-3 h-3 mr-2 inline" /> App Info
                </Link>
              </div>
            )}
          </div> */}

          {/* Reports & Analytics */}
          <div>
            <button
              onClick={() => toggleMenu('reports')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/reports']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <Assessment className="w-4 h-4 mr-2" />
                Reports & Analytics
              </div>
              {expandedMenus.includes('reports') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('reports') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/reports/weekly" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/reports/weekly') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <DateRange className="w-3 h-3 mr-2 inline" /> Weekly Profit/Loss
                </Link>
                <Link href="/reports/game-wise" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/reports/game-wise') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <TrendingUp className="w-3 h-3 mr-2 inline" /> Game-wise Earnings
                </Link>
                <Link href="/reports/user-wise" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/reports/user-wise') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Group className="w-3 h-3 mr-2 inline" /> User-wise Performance
                </Link>
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <Link
            href="/whatsapp"
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${isActive('/whatsapp') ? 'bg-red-500' : 'text-gray-300 hover:bg-gray-800'
              }`}
          >
            <WhatsApp className="w-4 h-4 mr-2" />
            WhatsApp
          </Link>

          {/* Notifications   - Will launch in next version - Prasad - 03-11-2025*/}
          {/* <div>
            <button
              onClick={() => toggleMenu('notifications')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-800 ${
                isParentActive(['/notifications']) ? 'bg-red-500 text-white' : 'text-gray-300'
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center">
                <Notifications className="w-4 h-4 mr-2" />
                Notifications
              </div>
              {expandedMenus.includes('notifications') ? <ExpandMore className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedMenus.includes('notifications') && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/notifications/send" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/notifications/send') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <NotificationImportant className="w-3 h-3 mr-2 inline" /> Send Notification
                </Link>
                <Link href="/notifications/announcements" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/notifications/announcements') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Announcement className="w-3 h-3 mr-2 inline" /> Manage Announcements
                </Link>
                <Link href="/notifications/history" className={`block px-3 py-1 rounded-lg text-xs ${isActive('/notifications/history') ? 'bg-gray-600' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <History className="w-3 h-3 mr-2 inline" /> Message History
                </Link>
              </div>
            )}
          </div> */}

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-gray-800 mt-4"
            suppressHydrationWarning
          >
            <Logout className="w-4 h-4 mr-2" />
            Logout
          </button>
        </nav>
      </div>
      
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to logout? You will need to login again to access the dashboard."
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        confirmText="Logout"
        type="danger"
      />
    </aside>
  )
}