// frontend/src/components/Comments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ annonceId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/comments/annonce/${annonceId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [annonceId]);

  return (
    <div>
      <h3>Commentaires</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <p>{c.username}: {c.comment_text}</p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
