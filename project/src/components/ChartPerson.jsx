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
import styled from 'styled-components';

export default function ChartPerson({
  movie,
  book,
  perfo,
  Allmovie,
  Allbook,
  Allperfo,
  innerWidth,
}) {
  const data = [
    {
      name: 'BOOK',
      AllUser: Allbook,
      User: book,
    },
    {
      name: 'MOVIE',
      AllUser: Allmovie,
      User: movie,
    },
    {
      name: 'PERFOMANCE',
      AllUser: Allperfo,
      User: perfo,
    },
  ];
  // console.log(movie);
  return (
    <>
      
      <LineChart
 width={innerWidth > 768 ? innerWidth - 970 : innerWidth - 40}
  height={300}
  data={data}
  margin={{
    top: 5,
    right: innerWidth >> 1024 ? 60 : 30,
    left: 0,
    bottom: 5,
  }}
  style={{
    overflow: 'hidden',
  }}
>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="AllUser" stroke="#82ca9d" />
          <Line type="monotone" dataKey="User" stroke="#00471b" />
        </LineChart>
      
    </>
  );
}
