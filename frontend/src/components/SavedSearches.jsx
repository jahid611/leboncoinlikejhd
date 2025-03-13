// frontend/src/components/SavedSearches.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedSearches = () => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/saved-searches')
      .then(res => setSearches(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Recherches Sauvegardées</h2>
      <ul>
        {searches.map(s => (
          <li key={s.id}>
            {s.search_query} - {new Date(s.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSearches;
