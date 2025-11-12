'use client';
import { useState, useEffect } from 'react';
import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import AddUserModal from '../users/AddUserModal';
import Dropdown from '@/components/ui/dropdown/index';
import FilteredBidsTable from '../../../components/dashboard/FilteredBidsTable';
import AtRiskTable from '../../../components/dashboard/AtRiskTable';
import { showError } from '@/utils/notification';
import { getAuthProps } from '@/utils/AuthenticationLibrary';
import { getUserSession } from '@/utils/cookies';
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

export default function DashboardPage() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [todayResults, setTodayResults] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [adminBidsList, setAdminBidsList] = useState([]);
  const [pagination, setpagination] = useState({});
  const [highRiskBids, setHighRiskBids] = useState([]);
  const [riskBidsLoading, setRiskBidsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    getTodaysResults();
  }, []);

  //Get today's results
  const getTodaysResults = () => {
    dashboardServices.getTodaysGameResults().then((response) => {
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        const formattedGames = response?.data.results.map((game: unknown) => ({
          value: (game as Record<string, unknown>).id,
          label: (game as Record<string, unknown>).game_name,
        }));
        setTodayResults(formattedGames);
        getVillegeList();
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
    });
  };
  //Get villege list
  const getVillegeList = () => {
    dashboardServices.getViilegeList().then((response: any) => {
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        // let villageList = response.data.users;
        const formattedVillages = response?.data.users.map(
          (village: unknown) => ({
            value: (village as Record<string, unknown>).id,
            label: (village as Record<string, unknown>).village,
          })
        );
        setVillageList(formattedVillages);
        getAdminBidsList();
      } else {
        showError(response.message || 'Failed to fetch village list');
        // console.log('Village list API failed with status:', response.message);
      }
    });
  };
  // Get admin bids list
  const getAdminBidsList = (filters: Record<string, unknown> = {}) => {
    const request = {
      pagination: {
        page: (filters.page as number) || 1,
        limit: 10,
      },
      filters: {
        village: (filters.village as string) || '',
        game_result_id: (filters.game_result_id as number) || null,
        date:
          (filters.date as string) || new Date().toISOString().split('T')[0],
        session_type: (filters.session_type as string) || '',
        status: (filters.status as string) || '',
      },
    };
    setIsLoading(true);
    dashboardServices.getAdminBids(request).then((response) => {
      console.log('Admin Bids API response :', response);
      if (response?.statusCode === 200 && response?.success === true) {
        const adminBids = Array.isArray(response?.data.bids)
          ? response?.data.bids
          : [];
        setAdminBidsList(adminBids);
        setpagination(response?.data.pagination || {});
        fetchHighRiskBids();
      } else {
        showError(response.message || 'Failed to fetch admin bids');
        console.log('Admin bids API failed with status:', response.message);
      }
    });
    setIsLoading(false);
  };
  // Get admin bids list
  const fetchHighRiskBids = (topCount = 5, gameName = '') => {
    const request = {
      pagination: {
        page: 1,
        limit: topCount,
      },
      filters: {
        date: new Date().toISOString().split('T')[0],
        game_name: gameName,
        top_quantity: topCount,
      },
    };
    setRiskBidsLoading(true);
    dashboardServices
      .getHighRiskBids(request)
      .then((response) => {
        if (response?.statusCode === 200 && response?.success === true) {
          setHighRiskBids(response?.data.bids || []);
        } else {
          showError(response.message || 'Failed to fetch high risk bids');
          console.log(
            'High risk bids API failed with status:',
            response.message
          );
        }
        setRiskBidsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching high risk bids:', error);
        setRiskBidsLoading(false);
      });
  };
  // Filter admin bids by village and game
  const getBidsByVillage = async (
    villageName: string,
    gameId?: string,
    page: number = 1
  ) => {
    const request = {
      pagination: {
        page: page,
        limit: 10,
      },
      filters: {
        village: villageName,
        game_result_id: gameId ? parseInt(gameId) : null,
        date: new Date().toISOString().split('T')[0],
        session_type: '',
        status: '',
      },
    };
    setIsLoading(true);
    dashboardServices.getAdminBids(request).then((response) => {
      if (response?.statusCode === 200 && response?.success === true) {
        const adminBids = Array.isArray(response?.data.bids)
          ? response?.data.bids
          : [];
        setAdminBidsList(adminBids);
        setpagination(response?.data.pagination || {});
      } else {
        showError(response.message || 'Failed to fetch admin bids');
        console.log('Admin bids API failed with status:', response.message);
      }
    });
    setIsLoading(false);
  };
  const handleUserAdded = () => {
    console.log('User added successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader onAddAgent={() => setIsAddUserModalOpen(true)} />
      <div className="grid grid-cols-5 gap-4 items-end flex items-center">
        <div className="col-span-2 ">
          <Dropdown
            options={todayResults}
            value={selectedGame}
            onChange={(value) => {
              setSelectedGame(String(value));
              if (value) {
                getBidsByVillage(selectedVillage, String(value));
              }
            }}
            placeholder="Select Game"
            className=""
          />
        </div>
        <div className="col-span-2">
          <Dropdown
            options={villageList}
            value={
              villageList.find((v) => v.label === selectedVillage)?.value || ''
            }
            onChange={(value) => {
              const selectedVillageObj = villageList.find(
                (v) => String(v.value) === String(value)
              );
              if (selectedVillageObj) {
                setSelectedVillage(selectedVillageObj.label);
                getBidsByVillage(selectedVillageObj.label, selectedGame);
              } else {
                setSelectedVillage('');
              }
            }}
            placeholder="Select Village"
            className=""
          />
        </div>
        <div className="col-span-1 flex items-center">
          <button
            onClick={() => {
              setSelectedGame('');
              setSelectedVillage('');
              getAdminBidsList();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium w-full"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <FilteredBidsTable
        selectedGame={selectedGame}
        selectedVillage={selectedVillage}
        adminBids={adminBidsList}
        pagination={pagination}
        onPageChange={(page: unknown) => {
          if (selectedVillage || selectedGame) {
            getBidsByVillage(selectedVillage, selectedGame, page as number);
          } else {
            getAdminBidsList({ page: page as number });
          }
        }}
      />
      <AtRiskTable
        gameOptions={todayResults}
        highRiskBids={highRiskBids}
        loading={riskBidsLoading}
        onFiltersChange={fetchHighRiskBids}
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
  );
}
