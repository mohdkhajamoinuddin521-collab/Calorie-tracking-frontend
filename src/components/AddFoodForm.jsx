import React, { useState } from 'react';
import api from '../api.js';
import './AddFoodForm.css';

export default function AddFoodForm({ onAdded, date }) {
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (mealType, e) => {
    e.preventDefault();
    try {
      const mealsResp = await api.get('/meals/', { params: { date } });
      let meal = mealsResp.data.find(m => m.date === date && m.meal_type === mealType);

      if (!meal) {
        const createResp = await api.post('/meals/', { date, meal_type: mealType });
        meal = createResp.data;
      }

      await api.post('/food-items/', {
        meal: meal.id,
        name,
        calories: parseInt(calories, 10),
        quantity
      });

      setName('');
      setCalories('');
      setQuantity(1);
      setExpandedMeal(null);

      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      alert('Failed to add food item');
    }
  };

  const meals = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'dinner', label: 'Dinner' },
    { key: 'snack', label: 'Snacks' }
  ];

  return (
    <div className="meal-sections">
      {meals.map((meal) => (
        <div key={meal.key} className="meal-card">
          <div className="meal-header">
            <h4>{meal.label}</h4>
            <button
              type="button"
              className="toggle-btn"
              onClick={() =>
                setExpandedMeal(expandedMeal === meal.key ? null : meal.key)
              }
            >
              {expandedMeal === meal.key ? '−' : '+'}
            </button>
          </div>

          {expandedMeal === meal.key && (
            <form onSubmit={(e) => handleSubmit(meal.key, e)} className="food-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Calories:</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  step="0.1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button type="submit" className="add-btn">Add</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
