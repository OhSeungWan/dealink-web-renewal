import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { AiOutlineClose } from 'react-icons/ai';
import { Container } from 'Components/Atoms';

const boxFade = (h = 80) => keyframes`
 0%{
  height:200%
 }
 30%{
  height:${90 - h}%
 }
 100%{
  height:${100 - h}%
 }
`;

const boxFade2 = (h = 80) => keyframes`
 0%{
  height:0%
 }
 30%{
  height:${200}%
 }
 100%{
  height:${h}%
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
  overflow: hidden;
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
  overflow-x: hidden;
  height: ${props => (props.height ? `${props.height}%` : '80%')};
  max-width: 400px;
  padding: 0px 15px 60px 15px;
  ${props => {
    if (props.isOpen) {
      return css`
        animation: ${props => boxFade2(props.height)} 1s 0s linear alternate;
      `;
    }
  }}
`;
const Progress = styled.div`
  margin: 15px;
`;

const ModalTop = styled.div`
  height: ${props => (props.height ? `${100 - props.height}%` : '20%')};
  ${props => {
    if (props.isOpen) {
      return css`
        animation: ${props => boxFade(props.height)} 1s 0s linear alternate;
      `;
    }
  }};
`;

//TODO: 애니메이션 효과 추가해야함
const Modal = props => {
  useEffect(() => {
    if (props.isOpen) {
      // document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
      document.body.style.cssText = `overflow: hidden; height:90vh`;
    } else {
      document.body.style.cssText = `overflow: ''; height:'100%`;
    }
    return () => {
      document.body.style.cssText = `overflow: ''; height:'100%`;
    };
  }, [props.isOpen]);

  return props.isOpen ? (
    <Container>
      <ModalWrapper>
        <ModalTop isOpen={props.isOpen} height={props.height}></ModalTop>
        <ModalContainer isOpen={props.isOpen} height={props.height}>
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              position: 'sticky',
              top: 0,
              fontSize: 20,
              width: '95%',
              padding: 20
            }}
          >
            <div style={{ width: '100%' }}>{props.title}</div>
            <AiOutlineClose size={30} onClick={props.closeModal} />
          </div>
          {props.children}
        </ModalContainer>
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
