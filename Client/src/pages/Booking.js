import React, { useState, useEffect } from 'react';

export default function Booking() {
  // 1) Hard-coded seeded events
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

  // 2) State: events list (seeded + user-created)
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('allEvents');
    return stored ? JSON.parse(stored) : seedEvents;
  });

  // 3) State: enrolled event IDs
  const [enrolledIds, setEnrolledIds] = useState(() => {
    const stored = localStorage.getItem('enrolledEvents');
    return stored ? JSON.parse(stored) : [];
  });

  // 4) Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    zoomLink: '',
  });

  // 5) Persist events list whenever it changes
  useEffect(() => {
    localStorage.setItem('allEvents', JSON.stringify(events));
  }, [events]);

  // 6) Persist enrolled IDs whenever they change
  useEffect(() => {
    localStorage.setItem('enrolledEvents', JSON.stringify(enrolledIds));
  }, [enrolledIds]);

  // 7) Handle form field changes
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // 8) Create new event
  const handleCreate = e => {
    e.preventDefault();
    const newEvent = {
      id: 'e' + (events.length + 1),
      title: form.title,
      description: form.description,
      date: form.date,
      zoomLink: form.zoomLink,
    };
    setEvents(evts => [...evts, newEvent]);
    setForm({ title: '', description: '', date: '', zoomLink: '' });
  };

  // 9) Enroll in an event
  const handleEnroll = id => {
    if (!enrolledIds.includes(id)) {
      setEnrolledIds(ids => [...ids, id]);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Booking Page</h1>

      {/* —— Create Event Form —— */}
      <form onSubmit={handleCreate} style={{ marginBottom: '2rem' }}>
        <h2>Create New Event</h2>
        <div>
          <label>
            Title:<br />
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:<br />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Date & Time:<br />
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Zoom Link:<br />
            <input
              type="url"
              name="zoomLink"
              value={form.zoomLink}
              onChange={handleChange}
              placeholder="https://zoom.us/..."
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '0.5rem' }}>
          Create Event
        </button>
      </form>

      {/* —— Available Events List —— */}
      <h2>Available Events</h2>
      {events.map(evt => {
        const enrolled = enrolledIds.includes(evt.id);
        return (
          <div
            key={evt.id}
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <strong>{evt.title}</strong><br />
            {new Date(evt.date).toLocaleString()}<br />
            <p>{evt.description}</p>
            <a
              href={evt.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Zoom Link
            </a>
            <br />
            <button
              onClick={() => handleEnroll(evt.id)}
              disabled={enrolled}
              style={{
                marginTop: '0.5rem',
                background: enrolled ? 'gray' : 'green',
                color: 'white',
                border: 'none',
                padding: '0.25rem 0.5rem',
                cursor: enrolled ? 'default' : 'pointer',
              }}
            >
              {enrolled ? 'Enrolled' : 'Enroll'}
            </button>
          </div>
        );
      })}
    </div>
  );
}