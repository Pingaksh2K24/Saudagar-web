'use client'
import { useState, useEffect } from 'react'
import { Storage, CheckCircle, Error } from '@mui/icons-material'
import { checkDatabaseConnection, getDatabaseInfo } from '../../../utils/dbCheck'

export default function DatabaseStatus() {
  const [dbStatus, setDbStatus] = useState({ connected: false, loading: true })
  const [dbInfo, setDbInfo] = useState<Record<string, unknown>>({})

  useEffect(() => {
    const checkConnection = async () => {
      const status = await checkDatabaseConnection()
      const info = getDatabaseInfo()
      setDbStatus({ ...status, loading: false })
      setDbInfo(info)
    }
    checkConnection()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Storage className="w-6 h-6 text-blue-500" />
          <div>
            <h3 className="font-semibold text-gray-900">Database Status</h3>
            <p className="text-sm text-gray-600">{String(dbInfo.type || 'Unknown')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {dbStatus.loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          ) : dbStatus.connected ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Error className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-sm font-medium ${
            dbStatus.connected ? 'text-green-600' : 'text-red-600'
          }`}>
            {dbStatus.loading ? 'Checking...' : dbStatus.connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      {Boolean(dbInfo.projectId) && (
        <div className="mt-3 text-xs text-gray-500">
          Project: {String(dbInfo.projectId)}
        </div>
      )}
    </div>
  )
}