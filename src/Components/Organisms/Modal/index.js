import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

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
  padding: 30px;
  z-index: 1;
  background-color: white;
  width: 90%;
  max-width: 400px;
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
