import React, { useState, useEffect } from 'react';

export default function Booking() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    summary:    '',
    description:'',
    start:      '',
    end:        '',
    zoomLink:   '',
  });

  // Load all events
  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events', {
        credentials: 'include',
      });
      if (res.status === 401) {
        window.location = '/api/google/auth';
        return;
      }
      const data = await res.json();
      // initialize enrolled flag to false
      setEvents(data.map(ev => ({ ...ev, enrolled: false })));
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle creation form
  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify(form),
      });
      if (res.status === 401) {
        window.location = '/api/google/auth';
        return;
      }
      if (!res.ok) throw new Error(await res.text());
      setForm({ summary:'', description:'', start:'', end:'', zoomLink:'' });
      fetchEvents();
    } catch (err) {
      console.error('Create failed:', err);
      alert('Create failed: ' + err.message);
    }
  };

  // Enroll handler: on success mark enrolled=true
  const handleEnroll = async id => {
    try {
      const res = await fetch(
        `/api/events/${id}/enroll`,
        {
          method:      'POST',
          credentials: 'include',
        }
      );
      if (res.status === 401) {
        window.location = '/api/google/auth';
        return;
      }
      if (!res.ok) throw new Error(await res.text());

      // mark that one event as enrolled
      setEvents(evts =>
        evts.map(ev =>
          ev._id === id ? { ...ev, enrolled: true } : ev
        )
      );
    } catch (err) {
      console.error('Enroll failed:', err);
      alert('Enroll failed: ' + err.message);
    }
  };

  // Delete handler
  const handleDelete = async id => {
    if (!window.confirm('Really delete this event?')) return;
    try {
      const res = await fetch(
        `http:///api/events/${id}`,
        {
          method:      'DELETE',
          credentials: 'include',
        }
      );
      if (res.status === 401) {
        window.location = 'http:///api/google/auth';
        return;
      }
      if (res.status === 204) {
        setEvents(evts => evts.filter(ev => ev._id !== id));
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', padding: '1rem' }}>
      {/* Events list */}
      <div style={{ flex: 2, marginRight: '1rem' }}>
        <h2>Available Events</h2>
        {events.map(ev => (
          <div
            key={ev._id}
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <strong>{ev.summary}</strong><br />
            {new Date(ev.start).toLocaleString()} –{' '}
            {new Date(ev.end).toLocaleString()}
            <br />
            {ev.description}
            <br />
            <a
              href={ev.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Zoom Link
            </a>
            {/* Enroll button */}
            <button
              onClick={() => handleEnroll(ev._id)}
              disabled={ev.enrolled}
              style={{
                marginLeft: '0.5rem',
                color: 'white',
                background: ev.enrolled ? 'gray' : 'green',
                border: 'none',
                padding: '0.25rem 0.5rem',
                cursor: ev.enrolled ? 'default' : 'pointer',
              }}
            >
              {ev.enrolled ? 'Enrolled' : 'Enroll'}
            </button>
            {/* Delete button */}
            {!ev.seeded && (
              <button
                onClick={() => handleDelete(ev._id)}
                style={{
                  marginLeft: '0.5rem',
                  color: 'white',
                  background: 'red',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Create form */}
      <div style={{ flex: 1 }}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:<br />
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <br />

          <label>
            Description:<br />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <br />

          <label>
            Start:<br />
            <input
              type="datetime-local"
              name="start"
              value={form.start}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <br />

          <label>
            End:<br />
            <input
              type="datetime-local"
              name="end"
              value={form.end}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <br />

          <label>
            Zoom Link:<br />
            <input
              name="zoomLink"
              value={form.zoomLink}
              onChange={handleChange}
              placeholder="https://zoom.us/…"
              required
            />
          </label>
          <br />
          <br />

          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
}
