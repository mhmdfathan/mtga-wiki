// src/components/Detail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.css'; // Import the CSS file

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.magicthegathering.io/v1/cards/${id}`);
        setCard(response.data.card);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="detail-container">
      {card ? (
        <div>
          <h2 className="detail-title">{card.name}</h2>
          <img src={card.imageUrl} alt={card.name} className="detail-image" />
          <p>Mana Cost: {card.manaCost}</p>
          <p>CMC: {card.cmc}</p>
          <p>Colors: {card.colors.join(', ')}</p>
          <p>Color Identity: {card.colorIdentity.join(', ')}</p>
          <p>Type: {card.type}</p>
          <p>Subtypes: {card.subtypes.join(', ')}</p>
          <p>Rarity: {card.rarity}</p>
          <p>Set: {card.set}</p>
          <p>Set Name: {card.setName}</p>
          <p>Text: {card.text}</p>
          <p>Artist: {card.artist}</p>
          <p>Number: {card.number}</p>
          <p>Power/Toughness: {card.power}/{card.toughness}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
