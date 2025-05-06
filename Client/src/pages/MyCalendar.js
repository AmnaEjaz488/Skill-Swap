import React, { useState, useEffect } from 'react';

export default function MyCalendar() {
  const [myEvents, setMyEvents] = useState([]);

  // Fetch and filter only SkillShare (Zoom) events
  const fetchCalendar = async () => {
    try {
      const res = await fetch('/api/calendar', {
        credentials: 'include',
      });
      if (res.status === 401) {
        // kick off OAuth if needed
        window.location = '/api/google/auth';
        return;
      }
      const data = await res.json();
      const skillEvents = Array.isArray(data)
        ? data.filter(evt => evt.description && evt.description.includes('Zoom:'))
        : [];
      setMyEvents(skillEvents);
    } catch (err) {
      console.error('Error fetching calendar:', err);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  // Remove an event from the user's Google Calendar
  const handleUnenroll = async (id) => {
    if (!window.confirm('Remove this event from your calendar?')) return;
    try {
      const res = await fetch(`/api/calendar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 204) {
        fetchCalendar();
      } else {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
    } catch (err) {
      console.error('Unenroll failed:', err);
      alert('Unenroll failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My SkillShare Events</h2>
      {myEvents.length === 0 && <p>No upcoming SkillShare events.</p>}
      {myEvents.map(evt => {
        const startRaw = evt.start.dateTime ?? evt.start.date;
        const isAllDay = !evt.start.dateTime;
        const startStr = isAllDay
          ? new Date(startRaw).toLocaleDateString()
          : new Date(startRaw).toLocaleString();
        return (
          <div key={evt.id} style={{ marginBottom: '1rem' }}>
            <strong>{evt.summary}</strong><br/>
            <em>{startStr}</em><br/>
            <p>{evt.description}</p>
            <button
              onClick={() => handleUnenroll(evt.id)}
              style={{
                marginTop: '0.5rem',
                background: 'orange',
                color: 'white',
                border: 'none',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer'
              }}
            >
              Unenroll
            </button>
          </div>
        );
      })}
    </div>
  );
}