'use client';
import { useState, useEffect } from 'react';
import { DateRange, Save, SportsEsports } from '@mui/icons-material';
import Button from '@/components/ui/button/index';
import Dropdown from '@/components/ui/dropdown/index';
import DateInput from '@/components/date-input/index';
import { formatDateForInput } from '../../../../utils/helper';
import { showSuccess, showError } from '@/utils/notification';
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

export default function DeclareResultPage() {
  const [selectedGame, setSelectedGame] = useState('');

  const handleGameSelect = (gameId: unknown) => {
    setSelectedGame(String(gameId));
    const selectedGameData = games.find(
      (game: Record<string, unknown>) => (game?.game_id as unknown) == gameId
    ) as unknown as Record<string, unknown>;
    console.log('Selected Game ID:', gameId);
    console.log('Selected Game Data:', selectedGameData);
    console.log('All Games:', games);
    if (selectedGameData) {
      setDate(
        formatDateForInput(selectedGameData?.result_date) ||
          formatDateForInput(new Date())
      );
      setOpenResult(String(selectedGameData?.open_result) || '');
      setCloseResult(String(selectedGameData?.close_result) || '');
      setWinningNumber(String(selectedGameData?.winning_number) || '');
    }
  };
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openResult, setOpenResult] = useState('');
  const [winningNumber, setWinningNumber] = useState('');
  const [closeResult, setCloseResult] = useState('');
  const [date, setDate] = useState('');
  const dashboardServices = new DashboardServices();

  // Get todays results
  const getTodaysResult = () => {
    setLoading(true);
    dashboardServices.getTodaysResults().then((response: any) => {
      console.log('Fetched game rates response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        const updateGameList = response?.data.results.map(
          (game: Record<string, unknown>) => ({
            game_id: game.game_id,
            game_name: game.game_name,
            result_date: game?.result_date,
            open_result: game?.open_result === null ? '' : game?.open_result,
            close_result: game?.close_result === null ? '' : game?.close_result,
            winning_number:
              game?.winning_number === null ? '' : game?.winning_number,
          })
        );
        console.log('Formatted Games List:', updateGameList);
        setGames(updateGameList);
      } else {
        showError(response.message || 'Failed to fetch game rates');
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getTodaysResult();
  }, []);

  // Handle declare result
  const handleDeclareResult = () => {
    setLoading(true);
    const request = {
      game_id: parseInt(selectedGame),
      result_date: date,
      open_result: openResult || null,
      close_result: closeResult || null,
      winning_number: winningNumber || null,
    };
    dashboardServices.declareResults(request).then((response: any) => {
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        getTodaysResult();
        setOpenResult('');
        setCloseResult('');
        setWinningNumber('');
        setSelectedGame('');
        showSuccess(response.message || 'Game added successfully!');
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
      setLoading(false);
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <DateRange className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Declare Result</h1>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <DateRange className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Declare Game Result
              </h2>
              <p className="text-red-100 text-sm">
                Enter the winning numbers for today&apos;s game
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <label className="block text-sm font-semibold text-blue-800 mb-3">
              Select Game
            </label>
            <Dropdown
              value={selectedGame}
              onChange={handleGameSelect}
              options={games.map((game: Record<string, unknown>) => ({
                value: String(game.game_id),
                label: String(game.game_name),
                icon: <SportsEsports />,
              }))}
              placeholder={loading ? 'Loading games...' : 'Choose Game'}
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4 text-center">
              Result Numbers
            </h3>
            <div className="flex items-end justify-center gap-6">
              <div className="text-center">
                <label className="block text-sm font-semibold text-green-700 mb-3">
                  Open Result
                </label>
                <input
                  type="text"
                  value={openResult}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                    setOpenResult(value);
                  }}
                  className="w-20 h-16 text-2xl font-bold text-center border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 bg-white shadow-lg"
                  placeholder="XXX"
                  maxLength={3}
                  suppressHydrationWarning
                />
              </div>
              <div className="text-3xl font-bold text-green-600 pb-4">-</div>
              <div className="text-center">
                <label className="block text-sm font-semibold text-green-700 mb-3">
                  Winning Number
                </label>
                <input
                  type="text"
                  value={winningNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                    setWinningNumber(value);
                  }}
                  className="w-16 h-16 text-2xl font-bold text-center border-2 border-yellow-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 bg-white shadow-lg"
                  placeholder="XX"
                  maxLength={2}
                  suppressHydrationWarning
                />
              </div>
              <div className="text-3xl font-bold text-green-600 pb-4">-</div>
              <div className="text-center">
                <label className="block text-sm font-semibold text-green-700 mb-3">
                  Close Result
                </label>
                <input
                  type="text"
                  value={closeResult}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                    setCloseResult(value);
                  }}
                  className="w-20 h-16 text-2xl font-bold text-center border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 bg-white shadow-lg"
                  placeholder="XXX"
                  maxLength={3}
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <DateInput
              label="Result Date"
              value={date}
              onChange={(value) => setDate(String(value))}
              disabled={true}
            />
          </div>

          <div className="pt-4">
            <Button
              caption={loading ? 'Declaring...' : 'Declare Result'}
              variant="primary"
              icon={<Save />}
              onClick={handleDeclareResult}
              disabled={loading || !selectedGame}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
