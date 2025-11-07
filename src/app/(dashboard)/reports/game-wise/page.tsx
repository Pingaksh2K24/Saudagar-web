'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, SportsEsports, BarChart } from '@mui/icons-material';
import StatsCard from '../../users/StatsCard';
import DataTable from '@/components/table/page';
import DateInput from '@/components/date-input/page';
import { showError } from '@/utils/notification';
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface GameReport extends Record<string, unknown> {
  game_name: string;
  total_bets: number;
  total_amount: number;
  total_wins: number;
  profit_loss: number;
  win_percentage: number;
  [key: string]: unknown;
}

interface GameWiseApiResponse {
  statusCode?: number;
  success?: boolean;
  data?: {
    game_wise_data?: GameReport[];
    summary?: Record<string, number>;
  };
  message?: string;
}

export default function GameWiseReportsPage() {
  const [reports, setReports] = useState<GameReport[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    fetchGameWiseEarnings();
  }, [selectedDate]);

  //Fetch game wise earning
  const fetchGameWiseEarnings = () => {
    setLoading(true);
    dashboardServices.getGameWiseReport(selectedDate).then((response: unknown) => {
      console.log('Game wise earning responnse :----', response);
      const apiResponse = response as GameWiseApiResponse;
      if (
        apiResponse &&
        apiResponse.statusCode === 200 &&
        apiResponse.success === true
      ) {
        const gameData = apiResponse?.data?.game_wise_data;
        const summaryData = apiResponse?.data?.summary;
        console.log('Game data to set:', gameData);
        setReports(Array.isArray(gameData) ? gameData : []);
        setSummary(summaryData || {});
      } else {
        showError(apiResponse?.message || 'Failed to fetch game wise reports');
        setReports([]);
      }
      setLoading(false);
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Game-wise Earnings
          </h1>
        </div>
        <DateInput
          value={selectedDate}
          onChange={setSelectedDate}
          label="Select Date"
          min={
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]
          }
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Games"
          value={summary?.total_games}
          icon={<SportsEsports className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Bets"
          value={summary?.total_bids}
          icon={<BarChart className="w-6 h-6" />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatsCard
          title="Total Amount"
          value={`₹${summary?.total_amount}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Net Profit"
          value={`₹${summary?.net_profit}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient={
            summary?.net_profit >= 0
              ? 'from-green-500 to-green-600'
              : 'from-red-500 to-red-600'
          }
        />
      </div>

      <DataTable<GameReport>
        data={reports}
        columns={[
          {
            key: 'game_name',
            label: 'Game',
            render: (value) => (
              <div className="flex items-center">
                <SportsEsports className="w-5 h-5 text-red-500 mr-2" />
                {String(value)}
              </div>
            ),
          },
          { key: 'total_bids', label: 'Total Bids' },
          {
            key: 'total_amount',
            label: 'Total Amount',
            render: (value) => `₹${Number(value).toLocaleString()}`,
          },
          {
            key: 'total_winning_amount',
            label: 'Total Wins',
            render: (value) => `₹${Number(value).toLocaleString()}`,
          },
          {
            key: 'profit_loss',
            label: 'Profit/Loss',
            render: (value) => (
              <span
                className={`font-medium ${Number(value) >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                ₹{Number(value).toLocaleString()}
              </span>
            ),
          },
          {
            key: 'win_percentage',
            label: 'Win %',
            render: (value) => (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  Number(value) > 100
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {String(value)}%
              </span>
            ),
          },
        ]}
        emptyMessage="No game reports found"
        loading={loading}
      />
    </div>
  );
}
