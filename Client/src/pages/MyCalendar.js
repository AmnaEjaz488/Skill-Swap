import React, { useEffect, useState } from 'react';

export default function MyCalendar() {
  const [enrolledEvents, setEnrolledEvents] = useState([]);

  useEffect(() => {
    // 1) Load full event list from localStorage (fallback to seeded)
    const storedAll = localStorage.getItem('allEvents');
    const seedEvents = [
      {
        id: 'e1',
        title: 'Intro to Guitar',
        description: 'Learn basic chords and strumming patterns.',
        date: '2025-05-05T18:00',
        zoomLink: 'https://zoom.us/j/1234567890',
      },
      {
        id: 'e2',
        title: 'JavaScript Crash Course',
        description: 'DOM, ES6+, and building interactive pages.',
        date: '2025-05-06T16:00',
        zoomLink: 'https://zoom.us/j/9876543210',
      },
    ];
    const allEvents = storedAll ? JSON.parse(storedAll) : seedEvents;

    // 2) Load enrolled IDs from localStorage
    const storedEnrolled = localStorage.getItem('enrolledEvents');
    const enrolledIds = storedEnrolled ? JSON.parse(storedEnrolled) : [];

    // 3) Filter for those IDs
    const list = allEvents.filter(evt => enrolledIds.includes(evt.id));
    setEnrolledEvents(list);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>My SkillShare Calendar</h1>
      {enrolledEvents.length === 0 ? (
        <p>You haven’t enrolled in any events yet.</p>
      ) : (
        enrolledEvents.map(evt => (
          <div
            key={evt.id}
            style={{
              border: '1px solid #333',
              padding: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <strong>{evt.title}</strong><br />
            {new Date(evt.date).toLocaleString()}<br />
            <em>{evt.description}</em><br />
            <a
              href={evt.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Join Zoom
            </a>
          </div>
        ))
      )}
    </div>
  );
}