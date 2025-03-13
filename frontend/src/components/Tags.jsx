// frontend/src/components/Tags.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map(t => (
          <li key={t.id}>
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
