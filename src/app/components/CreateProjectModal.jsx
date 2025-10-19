'use client'
import { useState } from 'react'
import { Add, SportsEsports, Description, Settings } from '@mui/icons-material'
import Modal from './Modal'
import Button from './button/page'
import AmountInput from './amount-input/AmountInput'
import TimeInput from './time-input/TimeInput'
import Input from './input/page'
import Dropdown from './dropdown/page'
import { showSuccess, showError } from '../../../utils/notification'
import { getCookie } from '../../utils/cookies'

let statusList = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function CreateProjectModal({ isOpen, onClose, onProjectCreated }) {
  const [gameName, setGameName] = useState('')
  const [description, setDescription] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [status, setStatus] = useState('active')
  const [resultNumber, setResultNumber] = useState('')

  const [minBetAmount, setMinBetAmount] = useState('')
  const [maxBetAmount, setMaxBetAmount] = useState('')
  const [resultDeclaredAt, setResultDeclaredAt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!gameName.trim() || !description.trim() || !openTime || !closeTime) return

    setLoading(true)
    console.log('Submitting game with status:', status)
    try {
      const token = getCookie('auth_token')
      const response = await fetch('http://localhost:3000/api/games/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          game_name: gameName.trim(),
          description: description.trim(),
          open_time: openTime,
          close_time: closeTime,
          status,
          result_number: resultNumber || null,

          min_bet_amount: minBetAmount ? parseInt(minBetAmount) : 10,
          max_bet_amount: maxBetAmount ? parseInt(maxBetAmount) : 5000,
          result_declared_at: resultDeclaredAt || null
        })
      })

      const data = await response.json()
      console.log('API Response:', data)

      if (response.ok) {
        showSuccess(data.message || 'Game created successfully!')
        onProjectCreated(data.game)
        setGameName('')
        setDescription('')
        setOpenTime('')
        setCloseTime('')
        setStatus('open')
        setResultNumber('')

        setMinBetAmount('')
        setMaxBetAmount('')
        setResultDeclaredAt('')
        onClose()
      } else {
        showError(`${data.error}${data.details ? ` - ${data.details}` : ''}`)
      }
    } catch (error) {
      console.error('Error creating game:', error)
      showError(`Network Error: ${error.message}. Please check your connection.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[450px] overflow-y-auto scrollbar-hide">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
            <Add className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Game</h2>
            <p className="text-sm text-gray-500">Set up your gaming experience</p>
          </div>
        </div>
        <form className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <SportsEsports className="w-4 h-4 mr-1" /> Game Name
            </label>
            <Input
              type="text"
              value={gameName}
              onChange={setGameName}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              placeholder="Enter game name"
              required
            />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Description className="w-4 h-4 mr-1" /> Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white resize-none"
              placeholder="Enter game description"
              required
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <TimeInput
                label="Open Time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                required
              />
              <TimeInput
                label="Close Time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <AmountInput
                label="Minimum"
                value={minBetAmount}
                onChange={(e) => setMinBetAmount(e.target.value)}
              />
              <AmountInput
                label="Maximum"
                value={maxBetAmount}
                onChange={(e) => setMaxBetAmount(e.target.value)}
                placeholder="₹10000"
              />
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Settings className="w-4 h-4 mr-1" /> Game Settings
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Dropdown
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  options={statusList}
                  placeholder="Select Status"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-3 pt-3 border-t border-gray-200">
            <Button
              variant="danger"
              caption="Cancel"
              onClick={onClose}
              size="sm"
            />
            <Button
              variant="primary"
              caption={loading ? 'Creating...' : 'Create Game'}
              disabled={loading || !gameName.trim() || !description.trim() || !openTime || !closeTime}
              onClick={handleSubmit} size="sm"
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}