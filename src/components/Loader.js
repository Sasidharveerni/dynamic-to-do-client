// Loader.js
import React from 'react';
import '../App.css'; // Optional: You can add custom styles for the loader

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
