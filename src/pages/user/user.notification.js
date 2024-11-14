import React from 'react';
import './index.css';

import SearchBar from '../../components/searchbar';

function Notification() {
  return (
    <div className="notification">
      <h2>Get Notified</h2>
      <p>Get emails about reviews, the latest features, tips, and companies and products.</p>
      
      <SearchBar />
    </div>
  );
}

export default Notification;
 