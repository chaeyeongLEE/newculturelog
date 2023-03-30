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

const Div1 = styled.div`
  display: flex;
`;

// const Div1 = styled.div`
//   display: flex;
//   @media screen and (max-width: 900px) {
//     display: none;
//   }
// `;

const Div2 = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
    display: flex;
    margin-top: 30px;
    margin-bottom: 80px;
    margin-left: -10px;
  }
`;

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
      <Div1>
        <LineChart
          width={innerWidth - 100}
          height={300}
          data={data}
          margin={{
            right: 10,
            left: 30,
            bottom: 5,
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
      </Div1>

      {/* <Div2>
        <LineChart
          width={570}
          height={200}
          data={data}
          margin={{
            right: 80,
            left: -40,
            bottom: 5,
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
      </Div2> */}
    </>
  );
}
