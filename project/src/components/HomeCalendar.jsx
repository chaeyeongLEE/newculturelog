import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './HomeCalendar.css';

export default function HomeCalendar() {
  return (
    <div style={{ padding: '0px 12px' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        // 날짜를 피그마 형식으로 변경하고 싶었으나, 정보가 없어서 못했습니다.
        // titleFormat={[{ year: 'numeric' }]}
        // titleFormat={[{ year: 'numeric', month: 'long', day: 'numeric' }]}
        // titleFormat={[{ year: 'short' }]}
        events={[
          { title: 'event 1', date: '2023-02-10' },
          { title: 'event 2', date: '2023-02-16' },
        ]}
      />
    </div>
  );
}
