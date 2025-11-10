'use client';
import { useState, useEffect } from 'react';
import {
  DateRange,
  TrendingUp,
  TrendingDown,
  AccountBalance,
} from '@mui/icons-material';
import StatsCard from '../../users/StatsCard';
import DataTable from '@/components/table/page';
import { getUserSession } from '@/utils/cookies';
import moment from 'moment';
import { showError } from '@/utils/notification';
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface DailyReport extends Record<string, unknown> {
  date: string;
  total_bets: number;
  total_amount: number;
  total_wins: number;
  profit_loss: number;
  [key: string]: unknown;
}

interface WeeklyApiResponse {
  statusCode?: number;
  success?: boolean;
  data?: {
    daily_data?: DailyReport[];
    summary?: {
      total_bids?: number;
      total_amount?: number;
      total_winning_amount?: number;
      profit_loss?: number;
    };
  };
  message?: string;
}

export default function DailyReportsPage() {
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [summary, setSummary] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    fetchWeeklyProfitLoss();
  }, []);

  //Fetch game wise earning
  const fetchWeeklyProfitLoss = () => {
    setLoading(true);
    dashboardServices.getWeeklyReport().then((response: unknown) => {
      console.log('Weekly report response:', response);
      const apiResponse = response as WeeklyApiResponse;
      if (
        apiResponse &&
        apiResponse.statusCode === 200 &&
        apiResponse.success === true
      ) {
        console.log('Daily profit loss data:', apiResponse);
        setReports(
          Array.isArray(apiResponse?.data?.daily_data) ? apiResponse?.data?.daily_data : []
        );
        setSummary(apiResponse?.data?.summary || null);
        console.log('Summary Details:', summary);
      } else {
        showError(apiResponse?.message || 'Failed to fetch weekly reports');
        setReports([]);
      }
      setLoading(false);
    });
  };

  const todayData = reports[0] || {
    total_bets: 0,
    total_amount: 0,
    total_wins: 0,
    profit_loss: 0,
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DateRange className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Weekly Profit/Loss
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Bets"
          value={summary?.total_bids}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Amount"
          value={`₹${summary?.total_amount?.toLocaleString() || '0'}`}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Wins"
          value={`₹${summary?.total_winning_amount}`}
          icon={<TrendingDown className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Profit/Loss"
          value={`₹${summary?.profit_loss}`}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient={
            todayData.profit_loss >= 0
              ? 'from-green-500 to-green-600'
              : 'from-red-500 to-red-600'
          }
        />
      </div>

      <DataTable<DailyReport>
        data={reports}
        columns={[
          {
            key: 'date',
            label: 'Date',
            render: (value) => moment(String(value)).format('DD/MM/YYYY'),
          },
          { key: 'total_bids', label: 'Total Bets' },
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
        ]}
        emptyMessage="No reports found"
        loading={loading}
      />
    </div>
  );
}
