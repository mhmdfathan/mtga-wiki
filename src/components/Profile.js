// src/components/Profile.js
import React from 'react';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <img
          src="https://example.com/path-to-your-image.jpg"
          alt="User Profile"
          className="profile-image"
        />
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        {/* Add more user information as needed */}
      </div>
    </div>
  );
};

export default Profile;
