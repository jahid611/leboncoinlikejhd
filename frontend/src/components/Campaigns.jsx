// frontend/src/components/Campaigns.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Campagnes Publicitaires</h2>
      <ul>
        {campaigns.map(c => (
          <li key={c.id}>
            Campagne: {c.campaign_name} pour annonce {c.annonce_id} - Budget: {c.budget} € <br />
            Du {c.start_date} au {c.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campaigns;
