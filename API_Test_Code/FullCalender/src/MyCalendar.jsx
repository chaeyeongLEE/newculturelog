import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MyCalendar.css';

export default function MyCalendar() {
  return (
    <div style={{width: '700px', margin: 'auto'}}>
      <FullCalendar plugins={[ dayGridPlugin]} events={[
          { title: 'event 1', date: '2023-02-10' },
          { title: 'event 2', date: '2023-02-16' }
      ]} />
    </div>
  )
}
