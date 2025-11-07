'use client';

import { useState } from 'react';
import Dropdown from '../ui/dropdown/page';
interface GameOption {
  value: number | string;
  label: string;
}

interface HighRiskBid {
  id: string | number;
  game_name: string;
  bid_number: string;
  amount: number;
  session_type: string;
  agent_name: string;
  village: string;
}

interface AtRiskTableProps {
  gameOptions?: GameOption[];
  highRiskBids?: HighRiskBid[];
  loading?: boolean;
  onFiltersChange?: (topCount?: number, gameName?: string) => void;
}

export default function AtRiskTable({
  gameOptions = [],
  highRiskBids = [],
  loading = false,
  onFiltersChange,
}: AtRiskTableProps) {
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedCount, setSelectedCount] = useState('5');
  const [selectedBids, setSelectedBids] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const bids = highRiskBids;
  const topSlectList = [
    { value: '5', label: 'Top 5' },
    { value: '10', label: 'Top 10' },
    { value: '15', label: 'Top 15' },
    { value: '20', label: 'Top 20' },
    { value: '25', label: 'Top 25' },
  ];

  const handleFilterChange = (count?: string, gameName?: string) => {
    if (onFiltersChange) {
      const finalGameName =
        gameName ||
        (selectedGame
          ? gameOptions.find((g) => g.value === selectedGame)?.label || ''
          : '');
      onFiltersChange(parseInt(count || selectedCount), finalGameName);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedBids(bids.map((_, index) => index.toString()));
    } else {
      setSelectedBids([]);
    }
  };

  const handleSelectBid = (index: string, checked: boolean) => {
    if (checked) {
      setSelectedBids([...selectedBids, index]);
    } else {
      setSelectedBids(selectedBids.filter((id) => id !== index));
      setSelectAll(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">At Risk Bids</h3>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-red-50 bg-gradient-to-r from-red-50 to-red-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">At Risk Bids</h3>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const dataToShare =
                  selectedBids.length > 0
                    ? bids.filter((_, index) =>
                        selectedBids.includes(index.toString())
                      )
                    : bids;

                const currentDate = new Date().toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });

                const message = `*High Risk Bids Report -*\n${currentDate} \n\n${dataToShare
                  .map(
                    (bid, index) =>
                      `${index + 1}. Game: ${bid.game_name}\n    Number: ${bid.bid_number} - ₹${bid.amount?.toLocaleString() || 0} - ${bid.session_type}\n`
                  )
                  .join('\n')}\nPlease review these high-risk bids.`;

                const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="px-6 py-0 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              Share
            </button>
            <Dropdown
              options={[{ value: '', label: 'All Games' }, ...gameOptions]}
              value={selectedGame}
              onChange={(value) => {
                const selectedGameObj = gameOptions?.find(
                  (g) => g.value === Number(value)
                );
                const gameName = selectedGameObj ? selectedGameObj.label : '';
                setSelectedGame(String(value));
                handleFilterChange(selectedCount, gameName);
              }}
              placeholder="Select Game"
              className="min-w-[150px]"
            />
            <Dropdown
              options={topSlectList}
              value={selectedCount}
              onChange={(value) => {
                setSelectedCount(String(value));
                const selectedGameObj = gameOptions.find(
                  (g) => g.value === selectedGame
                );
                const gameName = selectedGameObj ? selectedGameObj.label : '';
                handleFilterChange(String(value), gameName);
              }}
              placeholder="Select Count"
              className="min-w-[120px]"
            />
            <button
              onClick={() => {
                setSelectedGame('');
                setSelectedCount('5');
                handleFilterChange('5', '');
              }}
              className="px-4 py-0 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-red-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span>ID</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                Game
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                Session
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                Agent
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 Capitalize tracking-wider">
                Villege
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bids.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">📊</span>
                    </div>
                    <div className="text-gray-500 font-medium">
                      No Data Found
                    </div>
                    <div className="text-gray-400 text-sm">
                      No at-risk bids available at the moment
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              bids.map((bid, index) => (
                <tr
                  key={bid.id || index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedBids.includes(index.toString())}
                        onChange={(e) =>
                          handleSelectBid(index.toString(), e.target.checked)
                        }
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="font-mono text-gray-600">
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {bid.game_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-700 font-medium">
                    {bid.bid_number}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-bold text-red-500">
                    ₹
                    {bid.amount?.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || '0.00'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bid.session_type}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {bid.agent_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bid.village}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
