import React, { useEffect, useState } from 'react';
import { ImStarFull } from 'react-icons/im';
import styled from 'styled-components';

export default function Star() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  //별5개를 리턴하기 위한 상수 선언
  const array = [0, 1, 2, 3, 4];

  //별이 map함수에 의해 돌아가고 클릭한 별의 인덱스 값이 el에 찍히게 된다.
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  const Div = styled.div`
    margin: '0';
    & svg {
      color: #c4c4c4;
      cursor: pointer;
    }
    :hover svg {
      color: #f1ec61;
    }
    & svg:hover ~ svg {
      color: #c4c4c4;
    }
    .yellowStar {
      color: #f1ec61;
    }
  `;

  return (
    <Div>
      {array.map((el) => (
        <ImStarFull
          key={el}
          onclick={() => handleStarClick(el)}
          className={clicked[el] && 'yellowStar'}
          size="35"
        />
      ))}
    </Div>
  );
}
