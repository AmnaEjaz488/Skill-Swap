import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  summary:     { type: String, required: true },
  description: { type: String },
  start:       { type: Date,   required: true },
  end:         { type: Date,   required: true },
  zoomLink:    { type: String },
  seeded:      { type: Boolean, default: false },
});

// Create and default-export the Event model
const Event = mongoose.model('Event', eventSchema);
export default Event;