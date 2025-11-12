'use client';
import { useState, useEffect } from 'react';
import { Close, Save } from '@mui/icons-material';
import { getUserSession } from '@/utils/cookies';
import Input from '@/components/ui/input/index';
import { showSuccess, showError } from '@/utils/notification';

// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface GameRate {
  id: number;
  bid_type_id: number;
  game_id: number;
  bid_type_name: string;
  rate_per_rupee: number;
  min_bid_amount: number;
  max_bid_amount: number;
  is_active: boolean;
}

interface UpdateRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameRates: GameRate[];
  gameName: string;
  gameId: number;
  onRatesUpdated: () => void;
}

export default function UpdateRatesModal({
  isOpen,
  onClose,
  gameRates,
  gameName,
  gameId,
  onRatesUpdated,
}: UpdateRatesModalProps) {
  const [rates, setRates] = useState<GameRate[]>([]);
  const [loading, setLoading] = useState(false);

  const dashboardServices = new DashboardServices();

  useEffect(() => {
    setRates(gameRates);
  }, [gameRates]);

  const handleRateChange = (
    id: number,
    field: string,
    value: string | boolean
  ) => {
    setRates((prev) =>
      prev.map((rate) => (rate.id === id ? { ...rate, [field]: value } : rate))
    );
  };

  const handleUpdateGameRates = () => {
    setLoading(true);
    const request = {
      rates: rates.map((rate) => ({
        game_id: gameId,
        bid_type_id: rate.bid_type_id,
        rate_per_rupee: parseFloat(rate.rate_per_rupee.toString()),
        min_bid_amount: parseFloat(rate.min_bid_amount.toString()),
        max_bid_amount: parseFloat(rate.max_bid_amount.toString()),
        is_active: rate.is_active,
      })),
    };
    dashboardServices.updateGameRates(request, gameId).then((response: any) => {
      console.log('Update Game Response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        showSuccess(response.message || 'Rates updated successfully!');
        onRatesUpdated();
        onClose();
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
      setLoading(false);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Update Rates - {gameName}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
          >
            <Close className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  Bid Type
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  Rate (1:X)
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  Min Bet
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  Max Bet
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={rate.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">
                    {rate.bid_type_name}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <Input
                      type="number"
                      value={rate.rate_per_rupee.toString()}
                      onChange={(value) =>
                        handleRateChange(
                          rate.id,
                          'rate_per_rupee',
                          parseFloat(value)
                        )
                      }
                      placeholder="0.0"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <Input
                      type="number"
                      value={rate.min_bid_amount.toString()}
                      onChange={(value) =>
                        handleRateChange(
                          rate.id,
                          'min_bid_amount',
                          parseInt(value)
                        )
                      }
                      placeholder="10"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <Input
                      type="number"
                      value={rate.max_bid_amount.toString()}
                      onChange={(value) =>
                        handleRateChange(
                          rate.id,
                          'max_bid_amount',
                          parseInt(value)
                        )
                      }
                      placeholder="1000"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rate.is_active}
                        onChange={(e) =>
                          handleRateChange(
                            rate.id,
                            'is_active',
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      Active
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateGameRates}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
