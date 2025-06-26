import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../../redux/features/adminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import MessageModal from '../../../components/MessageModal/MessageModal';

const Auth = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { loading, error, success } = useSelector((state) => state.admin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

    const [modal, setModal] = useState({
      show: false,
      type: "success",
      message: "",
    });
  
    const openModal = (type, message) => {
      setModal({ show: true, type, message });
    };
  
    const closeModal = () => setModal({ ...modal, show: false });
  

const handleLogin = async (e) => {
  e.preventDefault();
  dispatch(adminLogin({ email, password }))
    .unwrap()
    .then((res) => {
      console.log(res)
      openModal('success', res.message || 'Login successful!!!');
      setTimeout(() => {
              navigate('/admin/dashboard');
        closeModal(); 
      }, 1000);
    })
    .catch((err) => {
      openModal('error', err || 'Login failed. Please try again.');
    }
  );
};

// useEffect(() => {
//   if (error) alert(error);
// }, [error]);


  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{
           backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
         {modal.show && (
        <MessageModal type={modal.type} message={modal.message} onClose={closeModal} />
      )}
      {/* White card */}
      <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Medical-themed header */}
        <div className="bg-blue-600 p-6 text-center">
       
          <h1 className="text-2xl font-bold text-white">MediCare Portal</h1>
          <p className="text-blue-100 mt-1">Administrative Access Only</p>
        </div>

        {/* Form container */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="admin@clinic.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
                loading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Secure access to MediCare Clinic Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;