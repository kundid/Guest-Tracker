import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function GuestTrackerWithVenue({ venue }) {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [table, setTable] = useState('');
  const [count, setCount] = useState('');
  const [entries, setEntries] = useState([]);

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('guest_entries') || '{}');
    if (storage[today]) setEntries(storage[today].filter(e => e.venue === venue));
  }, [venue]);

  const saveEntry = () => {
    const newEntry = {
      room,
      name,
      table,
      count,
      venue,
      time: new Date().toLocaleTimeString(),
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    setRoom('');
    setName('');
    setTable('');
    setCount('');

    const storage = JSON.parse(localStorage.getItem('guest_entries') || '{}');
    if (!storage[today]) storage[today] = [];
    storage[today].push(newEntry);
    localStorage.setItem('guest_entries', JSON.stringify(storage));
  };

  const exportToCSV = () => {
    const headers = ['Room', 'Name', 'Table', 'Guests', 'Time', 'Venue'];
    const rows = entries.map(e => [e.room, e.name, e.table, e.count, e.time, e.venue]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${venue}_entries_${today}.csv`;
    link.click();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {venue} - Guest Entry
      </h2>
      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Room Number" value={room} onChange={e => setRoom(e.target.value)} />
        <input placeholder="Guest Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Table Number" value={table} onChange={e => setTable(e.target.value)} />
        <input placeholder="No. of Guests" type="number" value={count} onChange={e => setCount(e.target.value)} />
        <button onClick={saveEntry}>Add Entry</button>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3>Today's Entries</h3>
          <button onClick={exportToCSV}>Export CSV</button>
        </div>
        <div style={{ fontWeight: 'bold', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderBottom: '1px solid black', paddingBottom: '0.5rem' }}>
          <div>Room</div><div>Name</div><div>Table</div><div>Guests</div><div>Time</div><div>Venue</div>
        </div>
        {entries.map((e, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', padding: '0.25rem 0', borderBottom: '1px solid #ccc' }}>
            <div>{e.room}</div>
            <div>{e.name}</div>
            <div>{e.table}</div>
            <div>{e.count}</div>
            <div>{e.time}</div>
            <div>{e.venue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}