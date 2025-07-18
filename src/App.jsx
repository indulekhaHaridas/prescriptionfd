import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreatePrescription from './components/CreatePrescription';
import Preview from './components/Preview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-prescription" element={<CreatePrescription />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}

export default App;
