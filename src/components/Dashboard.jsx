import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const doctorName = localStorage.getItem('doctorName') || 'Doctor';

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-green-100 via-white to-blue-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h1 className="text-xl font-bold text-blue-700">Prescription Portal</h1>
          <p className="text-sm text-gray-700 ml-2">Welcome, Dr. {doctorName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Create Prescription */}
          <div
            onClick={() => navigate('/create-prescription')}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl hover:bg-green-50 transition"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              ➕ Create New Prescription
            </h2>
            <p className="text-gray-600">
              Start writing a prescription by entering your patient’s medical details.
            </p>
          </div>

          {/* Card: Recent Prescriptions */}
          <div
            onClick={() => navigate('/preview')}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl hover:bg-blue-50 transition"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              📋 Recent Prescriptions
            </h2>
            <p className="text-gray-600">
              View and manage the prescriptions you’ve created.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 text-gray-600 text-sm border-t">
        © 2025 Doctor Prescription Portal — WhiteMatrix
      </footer>
    </div>
  );
}

export default Dashboard;
