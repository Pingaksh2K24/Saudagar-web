'use client';
import { useState, useEffect } from 'react';
import {
  Group,
  Person,
  AccountBalance,
  AttachMoney,
  EmojiEvents,
} from '@mui/icons-material';
import StatsCard from '../../users/StatsCard';
import DataTable from '@/components/table/page';
import { showError } from '@/utils/notification';
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface UserReport extends Record<string, unknown> {
  user_name: string;
  total_bets: number;
  total_amount: number;
  total_wins: number;
  profit_loss: number;
  last_activity: string;
  [key: string]: unknown;
}

interface AgentPerformanceResponse {
  statusCode?: number;
  success?: boolean;
  data?: {
    agent_list?: UserReport[];
    summary?: Record<string, unknown>;
  };
  message?: string;
}

export default function UserWiseReportsPage() {
  const [reports, setReports] = useState<UserReport[]>([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    fetchAgentPerformance();
  }, [selectedDate]);

  //Fetch user wise earning
  const fetchAgentPerformance = () => {
    const request = {
      pagination: {
        page: 1,
        limit: 10,
      },
      filters: {
        date: selectedDate,
      },
    };
    setLoading(true);
    dashboardServices.getAgentWiseReport(request).then((response) => {
      console.log('Agent wise earning responnse :----', response);
      const apiResponse = response as AgentPerformanceResponse;
      if (
        apiResponse &&
        apiResponse.statusCode === 200 &&
        apiResponse.success === true
      ) {
        const agentList = apiResponse?.data?.agent_list?.map((agent) => ({
          ...agent,
          total_bids: agent.total_bids ? agent.total_bids : '-',
        })) || [];
        setReports(agentList);
        setSummary(apiResponse?.data?.summary || {});
      } else {
        showError(apiResponse?.message || 'Failed to fetch agent performance');
        setReports([]);
      }
      setLoading(false);
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Group className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">
          User-wise Performance
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={summary?.total_agents}
          icon={<Group className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Bids Placed"
          value={summary?.total_bids}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Amount Bid"
          value={`₹${summary?.total_bid_amount}`}
          icon={<AccountBalance className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Total Winnings"
          value={`₹${summary?.total_winning_amount}`}
          icon={<EmojiEvents className="w-6 h-6" />}
          gradient="from-gray-500 to-gray-600"
        />
        <StatsCard
          title="Total Winnings"
          value={`₹${summary?.overall_profit_loss}`}
          icon={<EmojiEvents className="w-6 h-6" />}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      <div className="flex justify-end mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />
      </div>

      <DataTable<UserReport>
        data={reports}
        columns={[
          {
            key: 'agent_name',
            label: 'User',
            render: (value) => (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Person className="w-4 h-4 text-white" />
                </div>
                <span className="ml-3">{String(value)}</span>
              </div>
            ),
          },
          { key: 'total_bids', label: 'Total Bets' },
          {
            key: 'total_bid_amount',
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
            label: 'Our Profit/Loss',
            render: (value) => (
              <span
                className={`font-medium ${Number(value) >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                ₹{Number(value).toLocaleString()}
              </span>
            ),
          },
        ]}
        emptyMessage="No user reports found"
        loading={loading}
      />
    </div>
  );
}
