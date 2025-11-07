'use client'
import { useState } from 'react'
import { Search, FilterList } from '@mui/icons-material'

export interface Column<T = Record<string, unknown>> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  emptyMessage?: string
  pagination?: boolean | {
    current_page: number
    has_next: boolean
    has_prev: boolean
    per_page: number
    total: number
    total_pages: number
  }
  onPageChange?: (page: number) => void
  actions?: (row: T) => React.ReactNode
  loading?: boolean
}

export default function DataTable<T extends Record<string, unknown>>({
  data = [],
  columns = [],
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data found',
  pagination = false,
  onPageChange,
  actions,
  loading = false
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredData = data || []

  const sortedData = [...(data || [])].sort((a, b) => {
    if (!sortConfig) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
    if (String(aValue) < String(bValue)) return sortConfig.direction === 'asc' ? -1 : 1
    if (String(aValue) > String(bValue)) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  // Pagination logic
  const isPaginationObject = typeof pagination === 'object' && pagination !== null
  const paginationData = isPaginationObject ? pagination : null
  const shouldShowPagination = !!pagination
  const totalPages = isPaginationObject ? paginationData?.total_pages || 1 : Math.ceil((data || []).length / recordsPerPage)
  const currentPageNum = isPaginationObject ? paginationData?.current_page || 1 : currentPage
  const totalRecords = isPaginationObject ? paginationData?.total || 0 : (data || []).length
  const perPage = isPaginationObject ? paginationData?.per_page || 10 : recordsPerPage
  const startIndex = (currentPageNum - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalRecords)
  const paginatedData = isPaginationObject ? sortedData : (pagination ? sortedData.slice(startIndex, endIndex) : sortedData)

  const goToPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    } else {
      setCurrentPage(page)
    }
  }

  const goToPrevious = () => {
    if (isPaginationObject && paginationData?.has_prev) {
      goToPage(currentPageNum - 1)
    } else {
      setCurrentPage(prev => Math.max(prev - 1, 1))
    }
  }

  const goToNext = () => {
    if (isPaginationObject && paginationData?.has_next) {
      goToPage(currentPageNum + 1)
    } else {
      setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-900">
            <tr>
              {(columns || []).map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-sm font-medium text-white tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && sortConfig?.key === column.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(paginatedData || []).map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {(columns || []).map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key] || '')}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
        )}
      </div>
      
      {/* Pagination */}
      {pagination && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={goToPrevious}
              disabled={isPaginationObject ? !paginationData?.has_prev : currentPageNum === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={goToNext}
              disabled={isPaginationObject ? !paginationData?.has_next : currentPageNum === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{totalRecords > 0 ? startIndex + 1 : 0}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalRecords}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={goToPrevious}
                  disabled={isPaginationObject ? !paginationData?.has_prev : currentPageNum === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPageNum
                        ? 'z-10 bg-red-50 border-red-500 text-red-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={goToNext}
                  disabled={isPaginationObject ? !paginationData?.has_next : currentPageNum === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export interface Filter {
  key: string
  label: string
  options: { value: string; label: string }[]
}

export interface StatsCard {
  title: string
  value: number | string
  color: string
  icon?: React.ReactNode
}