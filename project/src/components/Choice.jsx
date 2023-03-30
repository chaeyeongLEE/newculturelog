import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Choice() {
  const navigate = useNavigate();
  const navigateToBook = () => {
    navigate('/Book');
  };
  const navigateToMovie = () => {
    navigate('/Movie');
  };
  const navigateToPerformance = () => {
    navigate('/Performance');
  };
  const Div = styled.div``;
  return (
    <Div>
      <button onClick={navigateToBook}>책</button>
      <button onClick={navigateToMovie}>영화</button>
      <button onClick={navigateToPerformance}>공연</button>
    </Div>
  );
}
