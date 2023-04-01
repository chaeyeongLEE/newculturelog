import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function Chart({ movie, book, perfo, innerWidth }) {
  const data = [
    {
      name: 'BOOK',
      AllUser: book,
    },
    {
      name: 'MOVIE',
      AllUser: movie,
    },
    {
      name: 'PERFOMANCE',
      AllUser: perfo,
    },
  ];

  return (
    // <div
    //   style={{
    //     margin: ' 10px 10px',
    //     display: 'flex',
    //     justifyContent: 'center',
    //   }}
    // >
    <div className='w-40'>
      <LineChart
        width={innerWidth -970}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 60,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AllUser" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
