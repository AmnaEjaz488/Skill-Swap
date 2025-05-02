import React, { useState, useEffect } from 'react';

export default function MyCalendar() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/calendar', {
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          window.location = 'http://localhost:3001/api/google/auth';
          return [];
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) return;
        // Keep only those with a Zoom link (i.e. your SkillShare enrollments)
        const skillEvents = data.filter(
          evt => evt.description && evt.description.includes('Zoom:')
        );
        setMyEvents(skillEvents);
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My SkillShare Events</h2>

      {myEvents.length === 0 && <p>No upcoming SkillShare events.</p>}

      {myEvents.map(evt => {
        const startRaw = evt.start.dateTime ?? evt.start.date;
        const endRaw   = evt.end?.dateTime   ?? evt.end?.date;
        const isAllDay = !evt.start.dateTime;

        const startStr = isAllDay
          ? new Date(startRaw).toLocaleDateString()
          : new Date(startRaw).toLocaleString();
        const endStr = endRaw && !isAllDay
          ? ` – ${new Date(endRaw).toLocaleString()}`
          : '';

        return (
          <div key={evt.id} style={{ marginBottom: '1rem' }}>
            <strong>{evt.summary}</strong><br/>
            <em>{startStr}{endStr}</em><br/>
            <p>{evt.description}</p>
          </div>
        );
      })}
    </div>
  );
}