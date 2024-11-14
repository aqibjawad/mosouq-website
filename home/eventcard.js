import React from 'react';
import './event.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <a href={event.registerLink} className="register-button">
        Register Now For Your Region!
      </a>
    </div>
  );
};

export default EventCard;