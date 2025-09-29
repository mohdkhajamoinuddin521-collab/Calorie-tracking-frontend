import React, { useEffect, useState } from 'react';
import api from '../api.js';
import './MealsPage.css';

export default function MealsListPage() {
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const fetchMeals = async () => {
    try {
      const resp = await api.get('/meals/', { params: { date } });
      setMeals(resp.data);
    } catch (err) {
      console.error(err);
      setMeals([]);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [date]);

  return (
    <div className="meals-container">
      <h2 className="meals-title">Meals for {date}</h2>

      <div className="date-picker">
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div className="meals-list">
        {meals.length === 0 ? (
          <p className="no-meals">No meals yet for this date.</p>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <h3>{meal.meal_type} — {meal.date}</h3>
              <p><strong>Calories:</strong> {meal.calories}</p>
              <ul>
                {meal.food_items.map((fi) => (
                  <li key={fi.id}>{fi.name} - {fi.total_calories} kcal</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
