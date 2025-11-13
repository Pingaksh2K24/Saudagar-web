'use client';
import { useState } from 'react';
import { Close, PersonAdd, Visibility, VisibilityOff } from '@mui/icons-material';
import Input from '@/components/ui/input';
import Button from '../../../components/ui/button/index';
import Dropdown from '../../../components/ui/dropdown/index';
import { getAuthProps } from '@/utils/AuthenticationLibrary';
import { showSuccess, showError } from '../../../utils/notification';
import { AddUserValidationRules } from '@/utils/validation/AllValidationRules';
import { isValidForm } from '@/utils/validation/CommonValidator';
// API Services
import AuthenticationServices from '@/lib/api/axiosServices/apiServices/AuthenticationServices';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    password: '',
    confirmPassword: '',
    role: 'agent',
    village: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [validState, isValidState] = useState({
    isValid: true,
    error: {},
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authenticationServices = new AuthenticationServices();

  const roleOptions = [
    { value: 'agent', label: 'Agent' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
  ];

  //Add user method
  const addUser = () => {
    if (isValidateAllFields()) {
      setLoading(true);
      const session = getAuthProps();
      const { confirmPassword, ...submitData } = formData;
      const request = {
        ...submitData,
        created_by: session?.user?.id || 'Admin',
      };
      authenticationServices.addNewUser(request).then((response: any) => {
        if (
          response &&
          response.statusCode === 201 &&
          response.success === true
        ) {
          setFormData({
            full_name: '',
            email: '',
            mobile_number: '',
            password: '',
            confirmPassword: '',
            role: '',
            village: '',
            address: '',
          });
          onUserAdded();
          onClose();
          showSuccess(response.message || 'User added successfully');
        } else {
          showError(response.message || 'Failed to fetch game wise reports');
        }
        setLoading(false);
      });
    }
  };

  const isValidateAllFields = () => {
    const newValidState = isValidForm(
      formData,
      AddUserValidationRules,
      validState
    );
    isValidState(newValidState);
    console.log('newValidState', newValidState);
    return newValidState.isValid;
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[500px] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <PersonAdd className="w-5 h-5 mr-2 text-red-500" />
            Add New User
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

        <form onSubmit={(e) => { e.preventDefault(); addUser(); }} className="space-y-4">
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
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, password: value }))
              }
              error={validState?.error?.password}
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                </button>
              }
            />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }))
              }
              error={validState?.error?.confirmPassword}
              icon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                </button>
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Village"
              value={formData.village}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, village: value }))
              }
              error={validState?.error?.village}
            />
            <Input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, address: value }))
              }
              error={validState?.error?.address}
            />
          </div>

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
              caption="Add User"
              variant="primary"
              loading={loading}
              onClick={addUser}
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
