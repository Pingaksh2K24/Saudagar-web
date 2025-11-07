'use client';
import { useState, useEffect } from 'react';
import { SportsEsports } from '@mui/icons-material';
import DataTable, { Column } from '@/components/table/page';
import UpdateRatesModal from './UpdateRatesModal';
import { showError } from '@/utils/notification';
import { getAuthProps } from '@/utils/AuthenticationLibrary';
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface GameRate extends Record<string, unknown> {
  id: number;
  gameName: string;
  bidType: string;
  rate: number;
  minBet: number;
  maxBet: number;
  status: 'active' | 'inactive';
}

export default function GameRatesPage() {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [gameRates, setGameRates] = useState<GameRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [selectedGameName, setSelectedGameName] = useState<string>('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    fetchGameList();
  }, []);

  //Get game list
  const fetchGameList = () => {
    setLoading(true);
    dashboardServices.fetchGameList().then((response) => {
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        const filteredGames = response?.data.games.map((game) => ({
          id: game.id,
          name: game.game_name,
        }));
        console.log('Fetched games:', filteredGames);
        setGamesList(Array.isArray(filteredGames) ? filteredGames : []);
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
      setLoading(false);
    });
  };

  // Get game rates
  const getGameRates = (game_id, game_name) => {
    setSelectedGameId(game_id);
    setSelectedGameName(game_name);
    setLoading(true);
    dashboardServices.getGameRates(game_id).then((response) => {
      console.log('Fetched game rates response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        const gameRates = response?.data?.rates;
        console.log('Fetched game rates:', gameRates);
        setGameRates(Array.isArray(gameRates) ? gameRates : []);
      } else {
        showError(response.message || 'Failed to fetch game rates');
        setGameRates([]);
      }
      setLoading(false);
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    );
  };

  const columns: Column<GameRate>[] = [
    {
      key: 'game_name',
      label: 'Game Name',
      sortable: true,
      render: (value) => (
        <div className="font-medium text-gray-900">{String(value)}</div>
      ),
    },
    {
      key: 'bid_type_name',
      label: 'Bid Type',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
          {String(value)}
        </span>
      ),
    },
    {
      key: 'rate_per_rupee',
      label: 'Rate (1:X)',
      sortable: true,
      render: (value) => (
        <div className="text-lg font-bold text-green-600">
          1:{String(value)}
        </div>
      ),
    },
    {
      key: 'min_bid_amount',
      label: 'Min Bet',
      sortable: true,
      render: (value) => <div className="text-gray-700">₹{String(value)}</div>,
    },
    {
      key: 'max_bid_amount',
      label: 'Max Bet',
      sortable: true,
      render: (value) => <div className="text-gray-700">₹{String(value)}</div>,
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value) => getStatusBadge(Boolean(value) ? 'active' : 'inactive'),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Game Rates
          </h1>
          <p className="text-gray-600 text-lg">
            Manage betting rates for different game types and bid categories
          </p>
        </div>
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          disabled={!selectedGameId}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update Rates
        </button>
      </div>

      {/* Game Selection */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
            <SportsEsports className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Select Game</h3>
          <span className="ml-auto px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            {gamesList.find((g) => g.id === selectedGameId)?.name || 'None'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {gamesList.map((game) => (
            <button
              key={game.id}
              onClick={() => getGameRates(game.id, game.name)}
              className={`group relative px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedGameId === game.id
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-red-300 shadow-md'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-center leading-tight">{game.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedGameId ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <DataTable<GameRate>
            data={gameRates}
            columns={columns}
            searchPlaceholder="Search bid types..."
            emptyMessage="No game rates found"
            loading={loading}
            pagination={true}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <SportsEsports className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Game Selected
          </h3>
          <p className="text-gray-500">
            Please select a game from above to view its rates and betting
            options.
          </p>
        </div>
      )}

      <UpdateRatesModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        gameRates={gameRates}
        gameName={selectedGameName}
        gameId={selectedGameId || 0}
        onRatesUpdated={() => {
          if (selectedGameId) {
            getGameRates(selectedGameId, selectedGameName);
          }
        }}
      />
    </div>
  );
}
