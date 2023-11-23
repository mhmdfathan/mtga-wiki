// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    cmc: '',
    types: '',
    subtypes: '',
    colorIdentity: '', // New filter for color identity
  });

  const { types, subtypes, colorIdentity } = filterCriteria;

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

  // Extract unique types, subtypes, and color identities from cards
  const uniqueTypes = [...new Set(cards.flatMap(card => card.types || []))];
  const uniqueSubtypes = [...new Set(cards.flatMap(card => card.subtypes || []))];
  const uniqueColorIdentities = [...new Set(cards.flatMap(card => card.colorIdentity || []))];

  const applyFilters = () => {
    // Filter cards based on criteria
    const filtered = cards.filter(card => {
      const cmcMatch = filterCriteria.cmc === '' || card.cmc === parseInt(filterCriteria.cmc, 10);
      const typesMatch = types === '' || (card.types && card.types.includes(types));

      // Apply Subtypes filter only if the selected type is not 'Instant', 'Sorcery', or 'Enchantment'
      const subtypesMatch =
        !['Instant', 'Sorcery', 'Enchantment'].includes(types) ||
        (subtypes === '' || (card.subtypes && card.subtypes.includes(subtypes)));

      const colorIdentityMatch =
        colorIdentity === '' || (card.colorIdentity && card.colorIdentity.includes(colorIdentity));

      return cmcMatch && typesMatch && subtypesMatch && colorIdentityMatch;
    });

    setFilteredCards(filtered);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleFilterSubmit = e => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div>
      <h2>Card List</h2>

      {/* Filtering Form */}
      <form onSubmit={handleFilterSubmit}>
        <label>
          Converted Mana Cost (CMC):
          <input type="number" name="cmc" value={filterCriteria.cmc} onChange={handleInputChange} />
        </label>
        <label>
          Types:
          <select name="types" value={types} onChange={handleInputChange}>
            <option value="">Any</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        {['Instant', 'Sorcery', 'Enchantment'].includes(types) ? null : (
          <label>
            Subtypes:
            <select name="subtypes" value={subtypes} onChange={handleInputChange}>
              <option value="">Any</option>
              {uniqueSubtypes.map((subtype, index) => (
                <option key={index} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Color Identity:
          <select name="colorIdentity" value={colorIdentity} onChange={handleInputChange}>
            <option value="">Any</option>
            {uniqueColorIdentities.map((identity, index) => (
              <option key={index} value={identity}>
                {identity}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Apply Filters</button>
      </form>

      {/* Display Filtered Cards */}
      <ul className="card-list">
        {(filteredCards.length > 0 ? filteredCards : cards).map(card => (
          <li key={card.id} className="card-item">
            {/* Wrap each card in a Link */}
            <Link to={`/detail/${card.id}`} className="card-link">
              <div className="card-container">
                <p className="card-name">{card.name}</p>
                <img src={card.imageUrl} alt={card.name} className="card-image" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
