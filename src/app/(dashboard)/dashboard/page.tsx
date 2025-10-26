'use client'
import { useState, useEffect } from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import StatsCards from '../../components/dashboard/StatsCards'
import AgentOverview from '../../components/dashboard/AgentOverview'
import LiveBetsTable from '../../components/dashboard/LiveBetsTable'
import VillageWiseStats from '../../components/dashboard/VillageWiseStats'
import QuickActions from '../../components/dashboard/QuickActions'
import RecentActivity from '../../components/dashboard/RecentActivity'
import TopNumbers from '../../components/dashboard/TopNumbers'
import WeeklyChart from '../../components/dashboard/WeeklyChart'
import GameWiseDetails from '../../components/dashboard/GameWiseDetails'
import AddUserModal from '../users/AddUserModal'
import Dropdown from '../../components/dropdown/page'
import FilteredBidsTable from '../../components/dashboard/FilteredBidsTable'

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalAgents: 52,
    activeAgents: 48,
    totalBets: 1247,
    todayCollection: 45670,
    pendingPayouts: 12450,
    netProfit: 33220
  })

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState('')
  const [selectedVillage, setSelectedVillage] = useState('')
  const [todayResults, setTodayResults] = useState([])
  const [villageList, setVillageList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTodayResults = async () => {
    console.log('Starting fetchTodayResults...')
    try {
      const response = await fetch('http://localhost:3000/api/results/today-game-results')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched Today Results:', data.results)
        const formattedGames = data?.results.map(game => ({
          value: game.id,
          label: game.game_name
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
      const response = await fetch('http://localhost:3000/api/auth/village-list')
      if (response.ok) {
        const data = await response.json()
        const formattedVillages = data?.users.map(village => ({
          value: village.id,
          label: village.village
        }))
        setVillageList(formattedVillages)
      } else {
        console.log('Village list API failed with status:', response.status)
      }
    } catch (error) {
      console.error('Error fetching village list:', error)
    }
  }

  useEffect(() => {
    console.log('Dashboard useEffect running...')
    setLoading(true)
    fetchTodayResults()
    fetchVillageList()
    setLoading(false)
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
          onChange={setSelectedGame}
          placeholder="Select Game"
          className=""
        />
        <Dropdown
          options={villageList}
          value={selectedVillage}
          onChange={setSelectedVillage}
          placeholder="Select Village"
          className=""
        />
      </div>

      <FilteredBidsTable selectedGame={selectedGame} selectedVillage={selectedVillage} />

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