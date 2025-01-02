import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../axios/axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const bgColor = isAdmin ? 'bg-[#39FF14]' : 'bg-[#FF2400]';
  const hoverColor = isAdmin ? 'hover:bg-green-600' : 'hover:bg-red-600';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isAdmin
        ? '/admin/login'
        : '/candidate/login';
      const response = await api.post(endpoint, { email, password });

      const { token, data } = response.data;

      if (response.data.success) {
        const id = data._id;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        toast.success(`Welcome ${data.name}!`);
        navigate(isAdmin ? '/admin/dashboard' : '/candidate/home');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed!';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };
  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Log in as Admin' : 'Log in as Candidate'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your account
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={toggleRole}
            className={`inline-flex items-center px-4 py-2 rounded-full ${bgColor} ${hoverColor} text-white`}
          >
            {isAdmin ? 'Switch to Candidate' : 'Switch to Admin'}
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
              />
           </div>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF2400] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}


