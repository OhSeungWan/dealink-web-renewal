import { Container, ScreenWrapper } from 'Components/Atoms';
import styled, { keyframes } from 'styled-components';

import React from 'react';

const boxFade = keyframes`
  0% {
    flex: 0;
  }
  50% {
    flex: 8
  }
  100% {
    flex: 9;
  }
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(157, 157, 157, 0.5);
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  flex: 9;
  overflow: auto;
  z-index: 1;
  background-color: white;
  width: 95%;
  max-width: 400px;
  padding: 15px;
  animation: ${boxFade} 1s 0s linear alternate;
`;
const ModalTop = styled.div`
  flex: 2;
`;

//TODO: 애니메이션 효과 추가해야함
const Modal = ({ ...props }) => {
  console.log(props.isOpen);
  const offset = { ...props.offset };
  return props.isOpen ? (
    <ModalWrapper>
      <ModalTop></ModalTop>
      <ModalContainer offset={offset ? true : false}>
        {props.children}
      </ModalContainer>
    </ModalWrapper>
  ) : null;
};

export default Modal;
