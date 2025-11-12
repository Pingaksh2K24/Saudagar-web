'use client';
import { useState, useEffect } from 'react';
import { AttachMoney, DateRange } from '@mui/icons-material';
import DataTable from '@/components/table/index';
import { ViewButton } from '@/components/action/index';
import StatsCard from '../../users/StatsCard';
import Dropdown from '@/components/ui/dropdown/index';
import BetDetailsModal from '../BetDetailsModal';
import React from 'react';
import moment from 'moment-timezone';
import { showError } from '@/utils/notification';
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface Bet extends Record<string, unknown> {
  id: number;
  user_name: string;
  game_name: string;
  bet_type: string;
  bet_number: string;
  amount: number;
  status: 'pending' | 'won' | 'lost';
  created_at: string;
  [key: string]: unknown;
}

interface BidType {
  id: number;
  display_name: string;
}

interface ApiResponse {
  statusCode?: number;
  success?: boolean;
  data?: {
    results?: BidType[];
    bids?: Bet[];
    pagination?: {
      current_page: number;
      has_next: boolean;
      has_prev: boolean;
      per_page: number;
      total: number;
      total_pages: number;
      total_won: number;
      total_lost: number;
      total_submitted: number;
    };
  };
  message?: string;
}

const statusOptions = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

export default function AllBetsPage() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [searchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [betTypeOptions, setBetTypeOptions] = useState<{value: number; label: string}[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 10,
    total: 0,
    total_pages: 1,
    total_won: 0,
    total_lost: 0,
    total_submitted: 0,
  });
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    getBidTypes();
  }, [currentPage, activeFilters]);

  //Get bid types
  const getBidTypes = () => {
    dashboardServices.getBidTypes().then((response: unknown) => {
      const apiResponse = response as ApiResponse;
      if (
        apiResponse &&
        apiResponse.statusCode === 200 &&
        apiResponse.success === true
      ) {
        const formattedTypes =
          apiResponse?.data?.results?.map((type) => ({
            value: type.id,
            label: type.display_name,
          })) || [];
        console.log('Fetched bet types:', formattedTypes);
        setBetTypeOptions(formattedTypes);
        getAllBids();
      } else {
        showError(apiResponse?.message || 'Failed to fetch bet types');
      }
    });
  };
  // Get admin bids list
  const getAllBids = () => {
    const request = {
      pagination: {
        page: currentPage,
        limit: 10,
      },
      filters: {
        date: null,
        game_id: null,
        session_type: null,
        status: activeFilters.status || null,
        bid_type: activeFilters.bet_type || null,
        user_id: undefined,
      },
    };
    setLoading(true);
    dashboardServices.getAllBids(request).then((response: unknown) => {
      console.log('Admin Bids API response :', response);
      const apiResponse = response as ApiResponse;
      if (apiResponse?.statusCode === 200 && apiResponse?.success === true) {
        setBets(
          Array.isArray(apiResponse?.data?.bids) ? apiResponse?.data?.bids : []
        );
        setPaginationInfo({
          current_page: apiResponse?.data?.pagination?.current_page || 1,
          has_next: apiResponse?.data?.pagination?.has_next || false,
          has_prev: apiResponse?.data?.pagination?.has_prev || false,
          per_page: apiResponse?.data?.pagination?.per_page || 10,
          total: apiResponse?.data?.pagination?.total || 0,
          total_pages: apiResponse?.data?.pagination?.total_pages || 1,
          total_won: apiResponse?.data?.pagination?.total_won || 0,
          total_lost: apiResponse?.data?.pagination?.total_lost || 0,
          total_submitted: apiResponse?.data?.pagination?.total_submitted || 0,
        });
      } else {
        showError(apiResponse?.message || 'Failed to fetch admin bids');
        setBets([]);
      }
      setLoading(false);
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <AttachMoney className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">All Bids</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Bids"
          value={paginationInfo.total}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Winning Bids"
          value={paginationInfo.total_won || 0}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Lost Bids"
          value={paginationInfo.total_lost || 0}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-red-500 to-red-600"
        />
        <StatsCard
          title="Submitted Bids"
          value={paginationInfo.total_submitted || 0}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-yellow-500 to-yellow-600"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setActiveFilters({});
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            Clear Filter
          </button>
          <Dropdown
            value={activeFilters.bet_type || ''}
            onChange={(value) => {
              setActiveFilters((prev) => ({
                ...prev,
                bet_type: String(value),
              }));
              setCurrentPage(1);
            }}
            options={betTypeOptions}
            placeholder="All Types"
            className="min-w-48"
          />
          <Dropdown
            value={activeFilters.status || ''}
            onChange={(value) => {
              setActiveFilters((prev) => ({ ...prev, status: String(value) }));
              setCurrentPage(1);
            }}
            options={statusOptions}
            placeholder="All Status"
            className="min-w-48"
          />
        </div>
      </div>

      <DataTable<Bet>
        data={bets.filter((bet) => {
          const matchesSearch =
            searchTerm === '' ||
            bet.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bet.game_name?.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesSearch;
        })}
        columns={[
          {
            key: 'full_name',
            label: 'Agent',
            sortable: true,
            render: (value, bet) => (
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {String(value)}
                </div>
                <div className="text-sm text-gray-500">ID: {bet.id}</div>
              </div>
            ),
          },
          {
            key: 'game_name',
            label: 'Game',
            render: (value) => (
              <span className="text-sm font-medium">{String(value)}</span>
            ),
          },
          {
            key: 'session_type',
            label: 'Session',
            render: (value) => (
              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {String(value)}
              </span>
            ),
          },
          {
            key: 'bid_type_name',
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
                {String(value)}
              </span>
            ),
          },
          {
            key: 'bid_number',
            label: 'Number',
            render: (value) => (
              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {String(value)}
              </span>
            ),
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (value) => (
              <span className="text-sm font-medium">₹{String(value)}</span>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  value === 'won'
                    ? 'bg-green-100 text-green-800'
                    : value === 'lost'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {String(value)}
              </span>
            ),
          },
          {
            key: 'bid_date',
            label: 'Date',
            render: (value) => (
              <span className="text-sm text-gray-500">
                <DateRange className="w-4 h-4 mr-2" />
                {moment(String(value)).tz('Asia/Kolkata').format('DD/MM/YYYY')}
              </span>
            ),
          },
        ]}
        emptyMessage="No bets found"
        loading={loading}
        pagination={paginationInfo}
        onPageChange={(page) => setCurrentPage(page)}
        actions={(bet) => (
          <div className="flex items-center justify-end">
            <ViewButton
              size="small"
              onClick={() => {
                setSelectedBet(bet);
                setIsModalOpen(true);
              }}
            />
          </div>
        )}
      />
      <BetDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bet={selectedBet}
      />
    </div>
  );
}
