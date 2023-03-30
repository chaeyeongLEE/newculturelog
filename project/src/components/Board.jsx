import React from 'react';
import YeongCalendar from './YeongCalendar';

import React from 'react';

export default function Board() {
  const data = [''];
  return (
    <div>
      <h2> 데이터값아 나와라! </h2>
      {data.map((el, index) => {
        return (
          <BoardChild
            title={el.title}
            date={el.date}
            review={el.review}
            key={index}
          />
        );
      })}
    </div>
  );
}
