'use client';
import { useState, useEffect } from 'react';
import { Close, Edit } from '@mui/icons-material';
import Button from '@/components/ui/button/page';
import Dropdown from '@/components/ui/dropdown/page';

import { showSuccess, showError } from '../../../utils/notification';
// API Services
import AuthenticationServices from '@/lib/api/axiosServices/apiServices/AuthenticationServices';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  user: {
    id: number;
    full_name: string;
    email: string;
    mobile_number: string;
    role: string;
    status: string;
    village: string;
    address: string;
  } | null;
}

export default function EditUserModal({
  isOpen,
  onClose,
  onUserUpdated,
  user,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    role: 'user',
    status: 'active',
    village: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const authenticationServices = new AuthenticationServices();

  const roleOptions = [
    { value: 'agent', label: 'Agent' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  useEffect(() => {
    if (user && typeof user === 'object') {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        mobile_number: user.mobile_number || '',
        role: user.role || 'user',
        status: user.status || 'active',
        village: user.village || '',
        address: user.address || '',
      });
    }
  }, [user]);

  //Add user method
  const updateUserById = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const request = {
      full_name: formData.full_name,
      mobile_number: formData.mobile_number,
      role: formData.role,
      email: formData.email,
      status: formData.status,
      village: formData.village,
      address: formData.address,
    };
    authenticationServices.updateUserById(request, user.id).then((response) => {
      console.log('Update user response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        onUserUpdated();
        onClose();
        showSuccess(response.message || 'User updated successfully');
      } else {
        showError(response.message || 'Failed to fetch game wise reports');
      }
      setLoading(false);
    });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[500px] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Edit className="w-5 h-5 mr-2 text-red-500" />
            Edit User
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Close className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={updateUserById} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, full_name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mobile_number: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <Dropdown
              options={roleOptions}
              value={formData.role}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, role: String(value) }))
              }
              placeholder="Select Role"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              options={statusOptions}
              value={formData.status}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, status: String(value) }))
              }
              placeholder="Select Status"
              required
            />
            <input
              type="text"
              placeholder="Village"
              value={formData.village}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, village: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              caption="Cancel"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            />
            <Button
              type="submit"
              caption="Update User"
              variant="primary"
              loading={loading}
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
