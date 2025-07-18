import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../services/allApi';
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Update state on input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle login submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await LoginApi(form);

      // ✅ Login success
      if (result.status === 200 && result.data?.existingDoctor) {
        toast.success('Login successful');

        // Optional chaining to avoid crash if name missing
        const doctorName = result?.data?.existingDoctor?.name || 'Doctor';
        const token = result?.data?.token || '';

        // Store in localStorage
        localStorage.setItem('doctorName', doctorName);
        localStorage.setItem('token', token);

        navigate('/');
      } 
      // ⚠️ Wrong credentials
      else if (result.response?.status === 401 || result.response?.status === 404) {
        toast.warning('Incorrect email or password');
      } 
      // ❌ Other failure
      else {
        toast.error('Login failed. Please try again.');
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Doctor Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
