// src/components/DashboardLayout.jsx
import React from 'react';
import './DashboardLayout.css'; // Style global du layout

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* MENU LATERAL OPTIONNEL */}
      {/* <aside className="dashboard-sidebar">
        <ul>
          <li><a href="/reports">Signalements</a></li>
          <li><a href="/activity-logs">Logs</a></li>
          <li><a href="/settings">Paramètres</a></li>
          ...
        </ul>
      </aside> */}

      {/* CONTENU PRINCIPAL */}
      <main className="dashboard-content">
        {children}
      </main>

      {/* PIED DE PAGE */}
      <footer className="dashboard-footer">
        <p>&copy; 2023 - LeBonCoinLike</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
