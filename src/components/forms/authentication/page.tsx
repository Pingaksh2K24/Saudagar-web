'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SVGIcons } from '../../../utils/svgConstants';
import { showSuccess, showError } from '../../../utils/notification';
import Input from '../../ui/input/page';
import Dropdown from '../../ui/dropdown/page';
import PasswordInput from '../../passwordinput/page';
import { isValidForm } from '@/utils/validation/CommonValidator';
import { LoginValidationRules } from '../../../utils/validation/AllValidationRules';
import AuthenticationServices from '../../../lib/api/axiosServices/apiServices/AuthenticationServices';
import { setAuthProps } from '../../../utils/AuthenticationLibrary';
import { platform } from 'os';

interface AuthPageProps {
  type: 'login' | 'register';
}

export default function AuthPage({ type }: AuthPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    mobile: '',
    role: 'user',
    platform: null,
  });

  const [loading, setLoading] = useState(false);
  const [validState, isValidState] = useState({
    isValid: true,
    error: {},
  });
  const isLogin = type === 'login';
  const router = useRouter();
  const authServices = new AuthenticationServices();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setFormData({ ...formData, platform: 'android' });
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setFormData({ ...formData, platform: 'iod' });
    } else {
      setFormData({ ...formData, platform: 'web' });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidateAllFields()) {
      setLoading(true);

      const request = {
        email: formData.email,
        password: formData.password,
        platform: formData.platform,
      };

      const response = await authServices.adminLogin(request);
      console.log('Login response:', response);
      if (
        response &&
        response.statusCode === 200 &&
        response.success === true
      ) {
        // Store user session in cookies
        if (response.data.token && response.data.user) {
          setAuthProps(response.data);
        }
        showSuccess('Login successful!');
        router.push('/dashboard');
      } else if (
        response &&
        response.statusCode === 401 &&
        response.success === false
      ) {
        showError(
          response?.message ||
            'Unauthorized access. Please check your credentials.'
        );
      } else {
        showError(response?.message || 'Login failed. Please try again.');
      }
      setLoading(false);
    } else {
      console.log('Validation failed:', validState.error);
    }
  };

  const isValidateAllFields = () => {
    const newValidState = isValidForm(
      formData,
      LoginValidationRules,
      validState
    );
    isValidState(newValidState);
    console.log('newValidState', newValidState);
    return newValidState.isValid;
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-4">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-1 border border-white/30">
                <img src="/images/icon.png" alt="Logo" className="w-20 h-20" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back!' : 'Join Us Today'}
              </h1>
              <p className="text-white/80 text-sm">
                {isLogin
                  ? 'Sign in to continue to your account'
                  : 'Create your account to get started'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form
              onSubmit={handleLogin}
              className="space-y-6"
              suppressHydrationWarning
            >
              {!isLogin && (
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                  required
                  icon={<SVGIcons.User className="w-5 h-5 text-gray-400" />}
                />
              )}

              {!isLogin && (
                <Input
                  type="tel"
                  label="Mobile Number"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(value) =>
                    setFormData({ ...formData, mobile: value })
                  }
                  required
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                />
              )}

              {!isLogin && (
                <Dropdown
                  label="Role"
                  options={[
                    { value: 'user', label: 'User' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'moderator', label: 'Moderator' },
                  ]}
                  value={formData.role}
                  onChange={(value) =>
                    setFormData({ ...formData, role: value as string })
                  }
                  required
                />
              )}

              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                required
                error={validState?.error?.email}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value) =>
                  setFormData({ ...formData, password: value })
                }
                required
                error={validState?.error?.password}
              />

              {!isLogin && (
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(value) =>
                    setFormData({ ...formData, confirmPassword: value })
                  }
                  required
                  error={
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? 'Passwords do not match'
                      : ''
                  }
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              )}

              {/* Remember Me (Login only) */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                suppressHydrationWarning
              >
                {loading
                  ? 'Please wait...'
                  : isLogin
                    ? 'Sign In'
                    : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Saudagar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
