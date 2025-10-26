'use client'
import { useState, useEffect } from 'react'
import { Edit, SportsEsports, Description, Settings } from '@mui/icons-material'
import Modal from './Modal'
import Button from './button/page'
import AmountInput from './amount-input/AmountInput'
import TimeInput from './time-input/TimeInput'
import Input from './input/page'
import Dropdown from './dropdown/page'
import { showSuccess, showError } from '../../../utils/notification'
import { getUserSession } from '@/utils/cookies'

export default function EditGameModal({ isOpen, onClose, gameId, gameData, onGameUpdated }) {
  const [gameName, setGameName] = useState('')
  const [description, setDescription] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [status, setStatus] = useState('open')
  const [minBetAmount, setMinBetAmount] = useState('')
  const [maxBetAmount, setMaxBetAmount] = useState('')
  const [village, setVillage] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)

  const formatTime = (isoString) => {
    return isoString ? new Date(isoString).toTimeString().slice(0, 5) : ''
  }

  useEffect(() => {
    if (isOpen && gameData) {
      setGameName(gameData.game_name || '')
      setDescription(gameData.description || '')
      setOpenTime(formatTime(gameData.open_time))
      setCloseTime(formatTime(gameData.close_time))
      setStatus(gameData.status || 'open')
      setMinBetAmount(gameData.min_bet_amount?.toString() || '')
      setMaxBetAmount(gameData.max_bet_amount?.toString() || '')
      setVillage(gameData.village || '')
      setAddress(gameData.address || '')
    }
  }, [isOpen, gameData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!gameName.trim() || !description.trim() || !openTime || !closeTime) return

    setLoading(true)
    try {
      const session = getUserSession()
      const response = await fetch(`http://localhost:3000/api/games/update/${gameId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${session?.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          game_name: gameName.trim(),
          description: description.trim(),
          open_time: openTime,
          close_time: closeTime,
          status,
          min_bet_amount: minBetAmount ? parseInt(minBetAmount) : 10,
          max_bet_amount: maxBetAmount ? parseInt(maxBetAmount) : 5000
        })
      })

      if (response.ok) {
        const data = await response.json()
        showSuccess('Game updated successfully!')
        onGameUpdated(data)
        onClose()
      } else {
        throw new Error('Failed to update game')
      }
    } catch (error) {
      console.error('Error updating game:', error)
      showError('Failed to update game')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[450px] overflow-y-auto scrollbar-hide">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
            <Edit className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Game</h2>
            <p className="text-sm text-gray-500">Update game information</p>
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white resize-none"
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
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Dropdown
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  options={[
                    { value: 'open', label: 'Active' },
                    { value: 'closed', label: 'Inactive' }
                  ]}
                  placeholder="Select Status"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Input
                  type="text"
                  value={village}
                  onChange={setVillage}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  placeholder="Village"
                />
                <Input
                  type="text"
                  value={address}
                  onChange={setAddress}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  placeholder="Address"
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
              caption={loading ? 'Updating...' : 'Update Game'}
              disabled={loading || !gameName.trim() || !description.trim() || !openTime || !closeTime}
              onClick={handleSubmit}
              size="sm"
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}