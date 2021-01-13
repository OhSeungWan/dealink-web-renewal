import { IoIosArrowDroprightCircle } from 'react-icons/io';
import React from 'react';
import banerTop from 'assets/img/banerTop.png';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
`;

const Container = styled.div`
  background-color: #f5f5f7;
  display: flex;
  width: 100%;
  max-width: 400px;
`;

const BanerText = styled.div`
  width: 100%;
  color: #3f3e43;
  width: 100%;
  padding: 3px 3px 3px 3px;
  font-size: 15px;
`;
const TitleText = styled.div`
  width: 100%;
  font-size: 18px;
  color: #6e44ff;
  padding: 3px 5px 3px 5px;
`;

// TODO: 페이지별 나타나는 조건 설정해 줘야함

export const BannerTop = ({ type }) => {
  const history = useHistory();
  const onClick = () => {
    history.push('/ProductEnrollment');
  };
  return (
    <Container onClick={onClick}>
      <Wrapper style={{ flex: 1 }}>
        <img src={banerTop} width="100%" height="100%"></img>
      </Wrapper>
      <RegisterWrapper style={{ flexDirection: 'row' }}></RegisterWrapper>
    </Container>
  );
};
