import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login as apiLogin } from '../api';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setLoading } = useLoading();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      login(data.user);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
        <div className="text-center">
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;