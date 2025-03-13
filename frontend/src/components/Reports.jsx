// frontend/src/components/Reports.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Signalements</h2>
      <ul>
        {reports.map(r => (
          <li key={r.id}>
            Annonce ID: {r.annonce_id} - Raison: {r.reason} - Statut: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
