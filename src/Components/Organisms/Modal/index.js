import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(157, 157, 157, 0.5);
  justify-content: center;
`;
const ModalContainer = styled.div`
  z-index: 1;
  background-color: white;
  width: 100%;
  max-width: 400px;
  margin-top: ${props => (props.offset.top ? props.offset.top : '30%')};
`;
const ModalContent = styled.div``;

//TODO: 애니메이션 효과 추가해야함
const Modal = ({ ...props }) => {
  console.log(props.isOpen);
  const offset = { ...props.offset };

  return props.isOpen ? (
    <ModalWrapper>
      <ModalContainer offset={offset ? true : false}>
        {props.children}
      </ModalContainer>
    </ModalWrapper>
  ) : null;
};

export default Modal;
