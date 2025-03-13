// frontend/src/components/Reviews.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = ({ sellerId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/seller/${sellerId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [sellerId]);

  return (
    <div>
      <h3>Avis du vendeur</h3>
      <ul>
        {reviews.map(r => (
          <li key={r.id}>
            <p><strong>{r.reviewer_name}</strong> a noté {r.rating} / 5</p>
            <p>{r.comment}</p>
            <small>{new Date(r.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
