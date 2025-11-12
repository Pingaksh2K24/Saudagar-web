'use client'
import { useState, useEffect } from 'react'
import { List, SportsEsports } from '@mui/icons-material'
import DataTable from '@/components/table/index'
import { showError } from '@/utils/notification'
import moment from 'moment'
// API Services
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices'

interface Result extends Record<string, unknown> {
  id: number
  game_name: string
  result_number: string
  date: string
  status: string
  [key: string]: unknown
}
 
interface ResultItem {
  id: number;
  game_name: string;
  open_result: string;
  close_result: string;
  open_status: string;
  close_status: string;
  winning_number: string;
  result_date: string;
}

interface ResultsApiResponse {
  statusCode?: number;
  success?: boolean;
  data?: {
    results?: ResultItem[];
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

export default function ViewResultsPage() {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [pagination, setPagination] = useState({
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 10,
    total: 0,
    total_pages: 1
  })
  const dashboardServices = new DashboardServices()

  useEffect(() => {
    getGameResults();
  }, [selectedDate])


    // Get game results
    const getGameResults = (page = 1) => {
      const request = {
          pagination: {
            page: page,
            limit: 20
          },
          filters: {
            date: selectedDate,
            status: ''
          }
        };
      setLoading(true);
      dashboardServices.getAllResults(request).then((response: unknown) => {
        console.log('Admin Bids API response :', response);
        const apiResponse = response as ResultsApiResponse;
        if (apiResponse?.statusCode === 200 && apiResponse?.success === true) {
        const resultList = apiResponse.data?.results?.map((item) => ({
        ...item,
        status: `${(item?.close_status === 'declared' && item?.open_status === 'declared')
          ? 'Result Declared'
          : (item?.open_status === 'declared' && item?.close_status === 'pending')
            ? 'Open Declared' : 'Pending'}`,

        result_number: `${item?.open_result === null || item?.open_result === '' ? 'XXX' : item?.open_result}
        - ${(item?.open_status === 'pending' && item?.close_status === 'pending') ? 'XX' : (item?.open_status === 'declared' && item?.close_status === 'pending') ? `${item?.winning_number}X` : item?.winning_number}
        - ${item?.close_result === null || item?.close_result === '' ? 'XXX' : item?.close_result}`
      })) || []
      setResults(resultList)
      setPagination(apiResponse?.data?.pagination || pagination)
        } else {
          showError(apiResponse?.message || 'Failed to fetch results');
        }
      });
      setLoading(false);
    };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <List className="w-8 h-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">View All Results</h1>
        </div>
      </div>

      <div className="flex items-center justify-end mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />
      </div>

      <DataTable<Result>
        data={results.filter(result => {
          const matchesSearch = searchTerm === '' ||
            result.game_name?.toLowerCase().includes(searchTerm.toLowerCase())
          return matchesSearch
        })}
        columns={[
          {
            key: 'id',
            label: 'ID',
            render: (value) => (String(value))
          },
          {
            key: 'game_name',
            label: 'Game',
            render: (value) => (
              <div className="flex items-center">
                <SportsEsports className="w-5 h-5 text-red-500 mr-2" />
                {String(value)}
              </div>
            )
          },
          {
            key: 'result_number',
            label: 'Result Number',
            render: (value) => (
              <div className="flex items-center text-red-500">
                {/* <SportsEsports className="w-5 h-5 text-red-500 mr-2" /> */}
                {String(value)}
              </div>
            )
          },
          {
            key: 'result_date',
            label: 'Date',
            render: (value) => (moment(String(value)).format('DD/MM/YYYY'))
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full
              ${value === 'Result Declared' ? `text-green-800` : value === 'Open Declared' ? `text-yellow-800` : `text-red-800`}
              ${value === 'Result Declared' ? `bg-emerald-100` : value === 'Open Declared' ? `bg-yellow-100` : `bg-red-100`}`}>
                {String(value)}
              </span>
            )
          }
        ]}
        emptyMessage="No results found"
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => getGameResults(page)}
      />
    </div>
  )
}