import React, { useState, useEffect } from 'react';

export default function MyCalendar() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/calendar', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(setMyEvents)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding:'1rem' }}>
      <h2>My Google Calendar</h2>
      {myEvents.map(evt => (
        <div key={evt.id} style={{ marginBottom:'0.5rem' }}>
          <strong>{evt.summary}</strong><br/>
          {new Date(evt.start.dateTime).toLocaleString()}<br/>
          {evt.description}
        </div>
      ))}
    </div>
  );
}