'use client';
import { useState, useEffect } from 'react';
import {
  Receipt,
  Person,
  AttachMoney,
  DateRange,
} from '@mui/icons-material';
import DataTable from '@/components/table/index';
import { ViewButton } from '@/components/action/index';
import StatsCard from '../../users/StatsCard';
import moment from 'moment';
import ViewReceiptModal from './ViewReceiptModal';
import { showError } from '@/utils/notification';
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

interface ReceiptData extends Record<string, unknown> {
  id: number;
  agent_name: string;
  total_bids: number;
  total_amount: number;
  receipt_date: string;
  receipt_number: string;
  status: string;
  [key: string]: unknown;
}

interface ApiResponse {
  statusCode?: number;
  success?: boolean;
  data?: {
    receipts?: ReceiptData[];
    pagination?: {
      current_page: number;
      has_next: boolean;
      has_prev: boolean;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message?: string;
}

export default function AllReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [pagination, setPagination] = useState({
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 10,
    total: 0,
    total_pages: 1,
  });
  const [currentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    fetchReceipts();
  }, [selectedDate]);

  const fetchReceipts = async (page = 1) => {
    const request = {
      pagination: {
        page: page,
        limit: 10
      },
      filters: {
        agent_id: null,
        date: selectedDate
      }
    };
    setLoading(true);
    dashboardServices.getAllReceipts(request).then((response: unknown) => {
      console.log('Receipts API response:', response);
      const apiResponse = response as ApiResponse;
      if (apiResponse?.statusCode === 200 && apiResponse?.success === true) {
        setReceipts(Array.isArray(apiResponse?.data?.receipts) ? apiResponse?.data?.receipts : []);
        setPagination(apiResponse?.data?.pagination || pagination);
      } else {
        showError(apiResponse?.message || 'Failed to fetch receipts');
        setReceipts([]);
      }
      setLoading(false);
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'completed'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {status === 'completed' ? 'Completed' : 'Pending'}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Receipt className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">All Receipts</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Receipts"
          value={receipts.length}
          icon={<Receipt className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Bids"
          value={receipts.reduce((sum, r) => sum + r.total_bids, 0)}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Amount"
          value={`₹${receipts.reduce((sum, r) => sum + Number(r.total_amount || 0), 0)}`}
          icon={<AttachMoney className="w-6 h-6" />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Completed"
          value={receipts.filter((r) => r.status === 'completed').length}
          icon={<Receipt className="w-6 h-6" />}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      {/* Date Filter */}
      <div className="flex justify-end mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />
      </div>

      <DataTable<ReceiptData>
        data={receipts}
        columns={[
          {
            key: 'receipt_no',
            label: 'Receipt #',
            render: (value) => (
              <span className="font-mono text-sm font-medium text-blue-600">
                {`#${String(value)}`}
              </span>
            ),
          },
          {
            key: 'agent_name',
            label: 'Agent',
            render: (value) => (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Person className="w-4 h-4 text-white" />
                </div>
                <span className="ml-3 font-medium">{String(value)}</span>
              </div>
            ),
          },
          {
            key: 'total_bids',
            label: 'Total Bids',
            render: (value) => (
              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                {String(value)}
              </span>
            ),
          },
          {
            key: 'total_amount',
            label: 'Total Amount',
            render: (value) => (
              <span className="text-green-600 font-semibold">
                ₹{Number(value).toLocaleString()}
              </span>
            ),
          },
          {
            key: 'receipt_date',
            label: 'Date',
            render: (value) => (
              <div className="flex items-center text-gray-600">
                <DateRange className="w-4 h-4 mr-1" />
                {moment(String(value)).format('DD/MM/YYYY')}
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => getStatusBadge(String(value)),
          },
        ]}
        emptyMessage="No receipts found"
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => {
          fetchReceipts(page);
        }}
        actions={(receipt) => (
          <ViewButton
            size="small"
            onClick={() => {
              setSelectedReceipt(receipt);
              setIsViewModalOpen(true);
            }}
          />
        )}
      />

      <ViewReceiptModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedReceipt(null);
        }}
        receipt={selectedReceipt}
      />
    </div>
  );
}
