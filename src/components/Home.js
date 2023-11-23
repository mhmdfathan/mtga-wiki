// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.magicthegathering.io/v1/cards');
        setCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Card List</h2>
      <ul className="card-list">
        {cards.map(card => (
          <li key={card.id} className="card-item">
            <Link to={`/detail/${card.id}`} className="card-link">
              {card.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
