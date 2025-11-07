'use client';
import { useState, useEffect } from 'react';
import {
  Edit,
  SportsEsports,
  Description,
  Settings,
} from '@mui/icons-material';
import Modal from './Modal';
import Button from '@/components/ui/button/page';
import AmountInput from '../ui/amountinput/page';
import TimeInput from '../time-input/TimeInput';
import Input from '@/components/ui/input/page';
import Dropdown from '@/components/ui/dropdown/page';
import { showSuccess, showError } from '../../utils/notification';
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';

export default function EditGameModal({
  isOpen,
  onClose,
  gameId,
  gameData,
  onGameUpdated,
}) {
  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [status, setStatus] = useState('open');
  const [minBetAmount, setMinBetAmount] = useState('');
  const [maxBetAmount, setMaxBetAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const statusList = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];
  const dashboardServices = new DashboardServices();

  const formatTime = (isoString) => {
    return isoString ? new Date(isoString).toTimeString().slice(0, 5) : '';
  };

  useEffect(() => {
    if (isOpen && gameData) {
      setGameName(gameData.game_name || '');
      setDescription(gameData.description || '');
      setOpenTime(formatTime(gameData.open_time));
      setCloseTime(formatTime(gameData.close_time));
      setStatus(gameData.status || 'open');
      setMinBetAmount(gameData.min_bet_amount?.toString() || '');
      setMaxBetAmount(gameData.max_bet_amount?.toString() || '');
    }
  }, [isOpen, gameData]);

  const updateGameDetailsById = () => {
    setLoading(true);
    const request = {
      game_name: gameName.trim(),
      description: description.trim(),
      open_time: openTime,
      close_time: closeTime,
      status,
      min_bet_amount: minBetAmount ? parseInt(minBetAmount) : 10,
      max_bet_amount: maxBetAmount ? parseInt(maxBetAmount) : 5000,
    };
    dashboardServices.updateGameById(request, gameId).then((response) => {
      console.log('Update Game Response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        showSuccess(response.message || 'Game updated successfully!');
        onGameUpdated(response);
        onClose();
      } else {
        showError(response.message || 'Failed to fetch village list');
      }
      setLoading(false);
    });
  };

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
              caption={loading ? 'Updating...' : 'Update Game'}
              disabled={
                loading ||
                !gameName.trim() ||
                !description.trim() ||
                !openTime ||
                !closeTime
              }
              onClick={updateGameDetailsById}
              size="sm"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
