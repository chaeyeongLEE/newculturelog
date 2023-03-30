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
    <div
      style={{
        margin: '30px 10px 10px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <LineChart
        width={innerWidth - 200}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
