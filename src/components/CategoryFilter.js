import React from 'react';
import './css/CategoryFilter.css';

const CategoryFilter = ({ categories, onFilterChange }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category">Filter by Category</label>
      <select id="category" onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
