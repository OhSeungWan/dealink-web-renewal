import styled, { css, keyframes } from 'styled-components';

import { Container } from 'Components/Atoms';
import React from 'react';

const boxFade = keyframes`
 0%{
  height:200%
 }
 30%{
  height:20%
 }
 100%{
  height:20%
 }
`;

const boxFade2 = keyframes`
 0%{
  height:0%
 }
 30%{
  height:80%
 }
 100%{
  height:80%
 }
`;

const rotation = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
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
  z-index: 9999;
`;
const ModalContainer = styled.div`
  overflow: auto;
  background-color: white;
  width: 95%;
  height: 80%;
  max-width: 400px;
  padding: 15px;
  ${props => {
    if (props.isOpen) {
      return css`
        animation: ${boxFade2} 1s 0s linear alternate;
      `;
    }
  }}
`;
const Progress = styled.div`
  margin: 15px;
`;

const ModalTop = styled.div`
  height: 20%;
  ${props => {
    if (props.isOpen) {
      return css`
        animation: ${boxFade} 1s 0s linear alternate;
      `;
    }
  }}
`;

//TODO: 애니메이션 효과 추가해야함
const Modal = ({ ...props }) => {
  return props.isOpen ? (
    <Container>
      <ModalWrapper>
        <ModalTop isOpen={props.isOpen}></ModalTop>
        <ModalContainer isOpen={props.isOpen}>{props.children}</ModalContainer>
      </ModalWrapper>
    </Container>
  ) : null;
};

const Circle = styled.div`
  background-color: #0009;
  border: 1px solid #ff0000;
  width: 100px;
  height: 100px;
  border-radius: 75px;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  color: #fff;
  vertical-align: middle;
  line-height: 100px;
`;

const LoadingCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 75px;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  vertical-align: middle;
  line-height: 100px;
  animation: ${rotation} 1s linear infinite;
`;

export const FadeBox = ({ ...props }) => {
  return props.isOpen ? (
    <Container>
      <ModalWrapper style={{ backgroundColor: 'rgba(157, 157, 157, 0.7)' }}>
        <ModalTop isOpen={props.isOpen}>
          <Circle>경매 종료</Circle>
        </ModalTop>
      </ModalWrapper>
    </Container>
  ) : null;
};

//TODO: 리펙토링~~~~
export const Loading = ({ ...props }) => {
  return props.isOpen ? (
    <Container>
      <ModalWrapper style={{ backgroundColor: 'white' }}>
        <Progress isOpen={props.isOpen}>
          <LoadingCircle>
            <div
              style={{
                borderRadius: '75px',
                backgroundColor: '#6E44FF',
                height: 15,
                width: 15,
                margin: 15
              }}
            ></div>
          </LoadingCircle>
        </Progress>
        <div style={{ fontWeight: 600, fontSize: 20 }}>Loading..</div>
      </ModalWrapper>
    </Container>
  ) : null;
};

export default Modal;
