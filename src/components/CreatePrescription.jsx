import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { createPrescriptionApi, getMedicineSuggestionsApi } from '../services/allApi';

function CreatePrescription() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctorName: localStorage.getItem('doctorName') || '',
    patientName: '',
    age: '',
    gender: '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '' }]
  });

  const [suggestions, setSuggestions] = useState([]);
  const [activeMedIndex, setActiveMedIndex] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = async (index, e) => {
    const { name, value } = e.target;
    const updatedMeds = [...form.medicines];
    updatedMeds[index][name] = value;
    setForm({ ...form, medicines: updatedMeds });

    if (name === 'name' && value.length >= 2) {
      setActiveMedIndex(index);
      try {
        const result = await getMedicineSuggestionsApi(value);
        if (result.status === 200) {
          setSuggestions(result.data);
        }
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (index, selectedName) => {
    const updatedMeds = [...form.medicines];
    updatedMeds[index].name = selectedName;
    setForm({ ...form, medicines: updatedMeds });
    setSuggestions([]);
    setActiveMedIndex(null);
  };

  const addMedicine = () => {
    setForm({
      ...form,
      medicines: [...form.medicines, { name: '', dosage: '', frequency: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createPrescriptionApi(form);
      if (result.status === 200) {
        toast.success('Prescription created successfully!', {
          position: 'top-center',
          autoClose: 2000
        });

        setTimeout(() => {
          navigate('/'); // Redirect to dashboard
        }, 2000);

        // Reset form
        setForm({
          doctorName: localStorage.getItem('doctorName') || '',
          patientName: '',
          age: '',
          gender: '',
          diagnosis: '',
          medicines: [{ name: '', dosage: '', frequency: '' }]
        });
      }
    } catch {
      toast.error('Failed to create prescription', {
        position: 'top-center'
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-blue-50">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Create Prescription</h2>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-700">Medicines</h3>
          {form.medicines.map((med, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(idx, e)}
                  className="px-2 py-1 border rounded"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(idx, e)}
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  name="frequency"
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) => handleMedicineChange(idx, e)}
                  className="px-2 py-1 border rounded"
                />
              </div>

              {suggestions.length > 0 && activeMedIndex === idx && (
                <ul className="absolute z-10 bg-white border mt-1 rounded shadow-md w-full max-w-md">
                  {suggestions.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => selectSuggestion(idx, item.name)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button type="button" onClick={addMedicine} className="text-blue-600 hover:underline text-sm">
            + Add More
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default CreatePrescription;
