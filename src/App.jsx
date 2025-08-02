import { useState } from 'react'
import GuestTrackerWithVenue from './GuestTrackerWithVenue'

export default function App() {
  const [venueSelected, setVenueSelected] = useState(false)
  const [venue, setVenue] = useState('')

  if (!venueSelected) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Select Venue</h1>
        {['Frangipani', 'India Jones', 'Mexican Room', 'Sunset', 'Rooftop'].map(v => (
          <button key={v} style={{ margin: '0.5rem' }} onClick={() => { setVenue(v); setVenueSelected(true); }}>
            {v}
          </button>
        ))}
      </div>
    )
  }

  return <GuestTrackerWithVenue venue={venue} />
}
