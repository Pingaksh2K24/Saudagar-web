'use client'
import { useState, useEffect } from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
// import StatsCards from '../../components/dashboard/StatsCards'
// import AgentOverview from '../../components/dashboard/AgentOverview'
// import LiveBetsTable from '../../components/dashboard/LiveBetsTable'
// import VillageWiseStats from '../../components/dashboard/VillageWiseStats'
// import QuickActions from '../../components/dashboard/QuickActions'
// import RecentActivity from '../../components/dashboard/RecentActivity'
// import TopNumbers from '../../components/dashboard/TopNumbers'
// import WeeklyChart from '../../components/dashboard/WeeklyChart'
// import GameWiseDetails from '../../components/dashboard/GameWiseDetails'
import AddUserModal from '../users/AddUserModal'
import Dropdown from '../../components/dropdown/page'
import FilteredBidsTable from '../../components/dashboard/FilteredBidsTable'

import { getUserSession } from '@/utils/cookies'

export default function DashboardPage() {


  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState('')
  const [selectedVillage, setSelectedVillage] = useState('')
  const [todayResults, setTodayResults] = useState([])
  const [villageList, setVillageList] = useState([])
  const [adminBidsList, setAdminBidsList] = useState([])
  const [pagination, setpagination] = useState({})


  const fetchTodayResults = async () => {
    console.log('Starting fetchTodayResults...')
    try {
      const response = await fetch('https://saudagar-backend.onrender.com/api/results/today-game-results')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched Today Results:', data.results)
        const formattedGames = data?.results.map((game: unknown) => ({
          value: (game as Record<string, unknown>).id,
          label: (game as Record<string, unknown>).game_name
        }))
        setTodayResults(formattedGames);
      } else {
        console.log('Today results API failed with status:', response.status)
      }
    } catch (error) {
      console.error('Error fetching today results:', error)
    }
  }

  const fetchVillageList = async () => {
    console.log('Starting fetchVillageList...')
    try {
      const response = await fetch('https://saudagar-backend.onrender.com/api/auth/village-list')
      if (response.ok) {
        const data = await response.json()
        const formattedVillages = data?.users.map((village: unknown) => ({
          value: (village as Record<string, unknown>).id,
          label: (village as Record<string, unknown>).village
        }))
        setVillageList(formattedVillages)
      } else {
        console.log('Village list API failed with status:', response.status)
      }
    } catch (error) {
      console.error('Error fetching village list:', error)
    }
  }

  const fetchAdminBids = async (filters: Record<string, unknown> = {}) => {
    console.log('Starting fetchAdminBids...')
    try {
      const requestBody = {
        pagination: {
          page: (filters.page as number) || 1,
          limit: 10
        },
        filters: {
          village: (filters.village as string) || '',
          game_result_id: (filters.game_result_id as number) || null,
          date: (filters.date as string) || new Date().toISOString().split('T')[0],
          session_type: (filters.session_type as string) || '',
          status: (filters.status as string) || ''
        }
      }
      const session = getUserSession()
      const response = await fetch('https://saudagar-backend.onrender.com/api/bids/fetch-admin-bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.token}`
        },
        body: JSON.stringify(requestBody)
      })

      console.log('Admin bids response status:', response.status)
      if (response.ok) {
        const resp = await response.json();
        const adminBids = Array.isArray(resp.data.bids) ? resp.data.bids : []
        console.log('Fetched Admin Bids:', resp)
        setAdminBidsList(adminBids);
        setpagination(resp.data.pagination || {})
      } else {
        console.log('Admin bids API failed with status:', response.status)
      }
    } catch (error) {
      console.error('Error fetching admin bids:', error)
    }
  }

  useEffect(() => {
    console.log('Dashboard useEffect running...')
    fetchTodayResults()
    fetchVillageList()
    fetchAdminBids()
  }, [])

  const handleUserAdded = () => {
    console.log('User added successfully')
  }

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader onAddAgent={() => setIsAddUserModalOpen(true)} />
      


      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          options={todayResults}
          value={selectedGame}
          onChange={(value) => setSelectedGame(String(value))}
          placeholder="Select Game"
          className=""
        />
        <Dropdown
          options={villageList}
          value={selectedVillage}
          onChange={(value) => setSelectedVillage(String(value))}
          placeholder="Select Village"
          className=""
        />
      </div>

      <FilteredBidsTable
        selectedGame={selectedGame}
        selectedVillage={selectedVillage}
        adminBids={adminBidsList}
        pagination={pagination}
        onPageChange={(page: unknown) => fetchAdminBids({ page: page as number })}
      />

      {/* <StatsCards data={dashboardData} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
            {/* <WeeklyChart /> */}
          </div>
          {/* <GameWiseDetails /> */}
          {/* <LiveBetsTable /> */}
          {/* <VillageWiseStats /> */}
        </div>

        <div className="space-y-6">
          {/* <QuickActions />
          <AgentOverview />
          <TopNumbers />
          <RecentActivity /> */}
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  )
}