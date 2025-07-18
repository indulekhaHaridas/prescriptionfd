import React, { useEffect, useRef, useState } from 'react';
import { getAllPrescriptionsApi } from '../services/allApi';

function Preview() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const result = await getAllPrescriptionsApi();
        if (result.status === 200) {
          setPrescriptions(result.data);
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handlePrint = (prescription) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            .card { border: 1px solid #ccc; padding: 15px; border-radius: 8px; }
            h3 { margin-bottom: 10px; color: #333; }
            ul { margin-top: 4px; padding-left: 20px; }
            li { margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h3>Prescription</h3>
            <p><strong>Doctor:</strong> ${prescription.doctorName}</p>
            <p><strong>Patient:</strong> ${prescription.patientName}</p>
            <p><strong>Age:</strong> ${prescription.age}</p>
            <p><strong>Gender:</strong> ${prescription.gender}</p>
            <p><strong>Diagnosis:</strong> ${prescription.diagnosis}</p>
            <p><strong>Medicines:</strong></p>
            <ul>
              ${prescription.medicines
                .map(
                  (med) =>
                    `<li>${med.name} - ${med.dosage} - ${med.frequency}</li>`
                )
                .join('')}
            </ul>
            <p><strong>Date:</strong> ${new Date(prescription.date).toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Prescription Preview</h2>
      <div className="space-y-4">
        {prescriptions.map((item, index) => (
          <div key={index} className="bg-white shadow p-4 rounded border relative">
            <p><strong>Doctor:</strong> {item.doctorName}</p>
            <p><strong>Patient:</strong> {item.patientName}</p>
            <p><strong>Age:</strong> {item.age}</p>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Diagnosis:</strong> {item.diagnosis}</p>
            <div>
              <strong>Medicines:</strong>
              <ul className="list-disc ml-5">
                {item.medicines.map((med, idx) => (
                  <li key={idx}>{med.name} - {med.dosage} - {med.frequency}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-2">Date: {new Date(item.date).toLocaleDateString()}</p>

            {/* Individual Print Button */}
            <div className="mt-3 text-right">
              <button
                onClick={() => handlePrint(item)}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
              >
                🖨️ Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
