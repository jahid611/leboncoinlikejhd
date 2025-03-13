// frontend/src/components/Coupons.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/coupons')
      .then(res => setCoupons(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Coupons</h2>
      <ul>
        {coupons.map(c => (
          <li key={c.id}>
            Code: {c.code} - Réduction: {c.discount} - {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coupons;
