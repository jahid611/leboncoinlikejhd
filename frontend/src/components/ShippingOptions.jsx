// frontend/src/components/ShippingOptions.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShippingOptions = ({ annonceId }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/shipping-options/annonce/${annonceId}`)
      .then(res => setOptions(res.data))
      .catch(err => console.error(err));
  }, [annonceId]);

  return (
    <div>
      <h2>Options de Livraison</h2>
      <ul>
        {options.map(o => (
          <li key={o.id}>
            {o.shipping_method} - Coût: {o.shipping_cost} € - Délai: {o.estimated_delivery_days} jours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingOptions;
