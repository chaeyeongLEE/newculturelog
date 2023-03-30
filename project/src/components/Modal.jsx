import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Modal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>

        <h4>기록하려는 문화활동을 선택해주세요.</h4>
        <Link to="/Movie">영화</Link>
        <br />
        <Link to="/Book">책</Link>
        <br />
        <Link to="/Performance">공연</Link>
      </div>
    </div>
  );
}

export default Modal;
