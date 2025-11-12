'use client';
import { useState, useEffect } from 'react';
import {
  SportsEsports,
  Add,
  Search,
  Edit,
  Delete,
  ViewModule,
  ViewList,
  DateRange,
} from '@mui/icons-material';
import DataTable from '../../../../components/table/index';
import { EditButton, DeleteButton } from '@/components/action/index';
import StatsCard from '@/app/(dashboard)/users/StatsCard';
import Dropdown from '@/components/ui/dropdown/index';
import Button from '@/components/ui/button/index';
import AddGameModal from '@/components/modals/AddGameModal';
import EditGameModal from '@/components/modals/EditGameModal';
import ConfirmDialog from '@/components/confirm-dialog/page';
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';
import { showSuccess, showError } from '@/utils/notification';

interface Game extends Record<string, unknown> {
  id: number;
  name: string;
  type: string;
  status: string;
  min_bet: number;
  max_bet: number;
  created_at: string;
  [key: string]: unknown;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function AllGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [selectedGameData, setSelectedGameData] = useState<{
    game: Game;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<number | null>(null);
  const dashboardServices = new DashboardServices();
  useEffect(() => {
    fetchGameList();
  }, []);

  //Get Game list
  const fetchGameList = () => {
    setLoading(true);
    dashboardServices.fetchGameList().then((response: any) => {
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        setGames(
          Array.isArray(response?.data.games) ? response?.data.games : []
        );
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
      setLoading(false);
    });
  };
  // Handle delete game method
  const handleDeleteGame = (gameId: number) => {
    setGameToDelete(gameId);
    setShowDeleteConfirm(true);
  };
  // confirm delete game
  const confirmDeleteGame = () => {
    if (gameToDelete) {
      setLoading(true);
      dashboardServices.deleteGameById(gameToDelete).then((response: any) => {
        console.log('Delete game response:', response);
        if (
          response &&
          response.statusCode === 200 &&
          response.success === true
        ) {
          showSuccess(response.message || 'Game deleted successfully');
          fetchGameList();
        } else {
          showError(response.message || 'Failed to delete game');
        }
        setLoading(false);
        setShowDeleteConfirm(false);
        setGameToDelete(null);
      });
    }
  };
  //Get game details by id
  const getGameDetailsById = (gameId: number) => {
    setLoading(true);
    dashboardServices.getGameDetailsById(gameId).then((response: any) => {
      console.log('Game details By Id response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        const gameDetails = response?.data.game;
        setSelectedGameId(gameId);
        setSelectedGameData(gameDetails);
        setIsEditModalOpen(true);
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
      setLoading(false);
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <SportsEsports className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">All Games</h1>
        </div>
        <Button
          caption="Add Game"
          variant="primary"
          icon={<Add />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Games"
          value={games.length}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Active Games"
          value={games.filter((g) => g.status === 'active').length}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Single Games"
          value={games.filter((g) => g.type === 'single').length}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Jodi Games"
          value={games.filter((g) => g.type === 'jodi').length}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-indigo-500 to-indigo-600"
        />
      </div>
      {/* View Toggle and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            suppressHydrationWarning
          >
            <ViewList className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            suppressHydrationWarning
          >
            <ViewModule className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              suppressHydrationWarning
            />
          </div>
          <Dropdown
            value={activeFilters.status || ''}
            onChange={(value) =>
              setActiveFilters((prev) => ({ ...prev, status: String(value) }))
            }
            options={statusOptions}
            placeholder="All Status"
            className="min-w-48"
          />
        </div>
      </div>
      {viewMode === 'table' ? (
        <DataTable<Game>
          data={games.filter((game: any) => {
            const matchesSearch =
              searchTerm === '' ||
              game?.game_name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType =
              !activeFilters.type || game.game_type === activeFilters.type;
            const matchesStatus =
              !activeFilters.status || game.status === activeFilters.status;
            return matchesSearch && matchesType && matchesStatus;
          })}
          columns={[
            {
              key: 'game_name',
              label: 'Game',
              sortable: true,
              render: (value, game) => (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <SportsEsports className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {String(value)}
                    </div>
                    <div className="text-sm text-gray-500">ID: {game.id}</div>
                  </div>
                </div>
              ),
            },
            {
              key: 'game_type',
              label: 'Type',
              render: (value) => (
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                    value === 'single'
                      ? 'bg-blue-100 text-blue-800'
                      : value === 'jodi'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {String(value ? value : '-')}
                </span>
              ),
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span
                  className={`px-2 py-1 text-xs font-semibold capitalize rounded-full ${
                    value === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {String(value)}
                </span>
              ),
            },
            {
              key: 'min_bet_amount',
              label: 'Min Bet',
              render: (value) => (
                <span className="text-sm">₹{String(value)}</span>
              ),
            },
            {
              key: 'max_bet_amount',
              label: 'Max Bet',
              render: (value) => (
                <span className="text-sm">₹{String(value)}</span>
              ),
            },
            {
              key: 'created_at',
              label: 'Created',
              render: (value) => (
                <span className="text-sm text-gray-500">
                  <DateRange className="w-4 h-4 mr-2" />
                  {new Date(String(value)).toLocaleDateString()}
                </span>
              ),
            },
          ]}
          emptyMessage="No games found"
          loading={loading}
          actions={(game) => (
            <div className="flex items-center justify-end space-x-4">
              <EditButton
                size="small"
                onClick={() => getGameDetailsById(game.id)}
              />
              <DeleteButton
                size="small"
                onClick={() => handleDeleteGame(game.id)}
              />
            </div>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games
            .filter((game: any) => {
              const matchesSearch =
                searchTerm === '' ||
                game.game_name
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase());
              const matchesType =
                !activeFilters.type || game.game_type === activeFilters.type;
              const matchesStatus =
                !activeFilters.status || game.status === activeFilters.status;
              return matchesSearch && matchesType && matchesStatus;
            })
            .map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                {/* Header with gradient */}
                <div
                  className={`h-2 bg-gradient-to-r ${
                    game.status === 'active'
                      ? 'from-green-400 to-green-600'
                      : 'from-blue-500 to-orange-500'
                  }`}
                ></div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 shadow-lg`}
                    >
                      <SportsEsports className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full capitalize tracking-wide ${
                          game.status === 'active'
                            ? 'bg-red-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {game.status}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        ID: {game.id}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {String(game?.game_name)}
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Min Bet
                      </span>
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        ₹{String(game.min_bet_amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Max Bet
                      </span>
                      <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                        ₹{String(game.max_bet_amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">Created</span>
                      <span className="text-xs font-medium text-gray-700">
                        {new Date(game.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      onClick={() => getGameDetailsById(game.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      onClick={() => handleDeleteGame(game.id)}
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Add Game Modal */}
      <AddGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={(game: unknown) => {
          console.log('Game created:', game);
          fetchGameList(); // Refresh games list
        }}
      />
      {/* Edit Game Modal */}
      <EditGameModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGameId(null);
          setSelectedGameData(null);
        }}
        gameId={selectedGameId}
        gameData={selectedGameData}
        onGameUpdated={(updatedGame: unknown) => {
          fetchGameList();
        }}
      />
      {/* Confirm Dialog Box on Delete Game */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Game"
        message="Are you sure you want to delete this game? This action cannot be undone."
        onConfirm={confirmDeleteGame}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setGameToDelete(null);
        }}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
