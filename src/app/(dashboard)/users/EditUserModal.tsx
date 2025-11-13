'use client';
import { useState, useEffect } from 'react';
import { Close, Edit } from '@mui/icons-material';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button/index';
import Dropdown from '@/components/ui/dropdown/index';
import { EditUserValidationRules } from '@/utils/validation/AllValidationRules';
import { isValidForm } from '@/utils/validation/CommonValidator';
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
    role: 'agent',
    status: 'active',
    village: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [validState, isValidState] = useState({
    isValid: true,
    error: {},
  });
  const authenticationServices = new AuthenticationServices();

  const roleOptions = [
    { value: 'agent', label: 'Agent' },
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

  const isValidateAllFields = () => {
    const newValidState = isValidForm(
      formData,
      EditUserValidationRules,
      validState
    );
    isValidState(newValidState);
    return newValidState.isValid;
  };

  //Update user method
  const updateUserById = () => {
    if (isValidateAllFields()) {
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
      authenticationServices
        .updateUserById(request, user.id)
        .then((response: any) => {
          if (
            response &&
            response.statusCode === 200 &&
            response.success === true
          ) {
            onUserUpdated();
            onClose();
            showSuccess(response.message || 'User updated successfully');
          } else {
            showError(response.message || 'Failed to update user');
          }
          setLoading(false);
        });
    }
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
            onClick={() => {
              onClose();
              isValidState({ isValid: true, error: {} });
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <Close className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); updateUserById(); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, full_name: value }))
              }
              required
              error={validState?.error?.full_name}
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, email: value }))
              }
              error={validState?.error?.email}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  mobile_number: value,
                }))
              }
              error={validState?.error?.mobile_number}
            />
            <Dropdown
              options={roleOptions}
              value={formData.role}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, role: String(value) }))
              }
              placeholder="Select Role"
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
            />
            <Input
              type="text"
              placeholder="Village"
              value={formData.village}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, village: value }))
              }
              error={validState?.error?.village}
            />
          </div>

          <Input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, address: value }))
            }
            error={validState?.error?.address}
          />

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              caption="Cancel"
              variant="outline"
              onClick={() => {
                onClose();
                isValidState({ isValid: true, error: {} });
              }}
              className="flex-1"
            />
            <Button
              type="button"
              caption="Update User"
              variant="primary"
              loading={loading}
              onClick={updateUserById}
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
