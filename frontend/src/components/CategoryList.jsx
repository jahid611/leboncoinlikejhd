// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <DashboardLayout>
      <h2 className="page-title">Catégories</h2>
      <table className="categories-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default CategoryList;
