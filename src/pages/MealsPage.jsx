import React, { useState } from 'react';
import AddFoodForm from '../components/AddFoodForm.jsx';
import './MealsPage.css';
import { Link } from 'react-router-dom';



export default function AddMealPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleFoodAdded = async () => {
    // You can add optional refresh logic here if needed
    console.log("Food item added for date:", date);
  };

  return (
    <div className="meals-container">
      <div className="meals-header">
        <h2 className="meals-title">Add Meals</h2>
        <Link to="/meals" className="nav-btn">Meals</Link>
      </div>

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

      <AddFoodForm onAdded={handleFoodAdded} date={date} />
    </div>
  );
}
