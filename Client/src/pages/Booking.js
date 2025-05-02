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

  // 1) Load all events (seeded + created)
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/events', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 2) Create a new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/events', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:    JSON.stringify(form),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      setForm({ summary:'',description:'',start:'',end:'',zoomLink:'' });
      fetchEvents();
    } catch (err) {
      console.error('Create failed:', err);
      alert('Create failed: ' + err.message);
    }
  };

  // 3) One-click enroll into Google Calendar
  const handleEnroll = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${id}/enroll`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      alert('✅ Enrolled! Check your Google Calendar.');
    } catch (err) {
      console.error('Enroll failed:', err);
      alert('Enroll failed: ' + err.message);
    }
  };

  // 4) Delete a user-created (non-seeded) event
  const handleDelete = async (id) => {
    if (!window.confirm('Really delete this event?')) return;
    try {
      const res = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 204) {
        fetchEvents();
      } else {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + err.message);
    }
  };

  // 5) Handle form inputs
  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div style={{ display:'flex', padding:'1rem' }}>
      {/* ── Existing Events ── */}
      <div style={{ flex:2, marginRight:'1rem' }}>
        <h2>Available Events</h2>
        {events.map(ev => (
          <div
            key={ev._id}
            style={{
              border:'1px solid #ccc',
              padding:'0.5rem',
              marginBottom:'0.5rem'
            }}
          >
            <strong>{ev.summary}</strong><br/>
            {new Date(ev.start).toLocaleString()} – {new Date(ev.end).toLocaleString()}<br/>
            {ev.description}<br/>
            <a href={ev.zoomLink} target="_blank" rel="noopener noreferrer">
              🔗 Zoom Link
            </a>
            {/* Enroll on ALL events */}
            <button
              onClick={() => handleEnroll(ev._id)}
              style={{
                marginLeft:'0.5rem',
                color:'white',
                background:'green',
                border:'none',
                padding:'0.25rem 0.5rem',
                cursor:'pointer'
              }}
            >
              Enroll
            </button>
            {/* Only show Delete on events you created (seeded=false) */}
            {!ev.seeded && (
              <button
                onClick={() => handleDelete(ev._id)}
                style={{
                  marginLeft:'0.5rem',
                  color:'white',
                  background:'red',
                  border:'none',
                  padding:'0.25rem 0.5rem',
                  cursor:'pointer'
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── Create Your Own Event ── */}
      <div style={{ flex:1 }}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:<br/>
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
            />
          </label><br/><br/>

          <label>Description:<br/>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label><br/><br/>

          <label>Start:<br/>
            <input
              type="datetime-local"
              name="start"
              value={form.start}
              onChange={handleChange}
              required
            />
          </label><br/><br/>

          <label>End:<br/>
            <input
              type="datetime-local"
              name="end"
              value={form.end}
              onChange={handleChange}
              required
            />
          </label><br/><br/>

          <label>Zoom Link:<br/>
            <input
              name="zoomLink"
              value={form.zoomLink}
              onChange={handleChange}
              placeholder="https://zoom.us/…"
              required
            />
          </label><br/><br/>

          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
}