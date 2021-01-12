import { IoIosArrowDroprightCircle } from 'react-icons/io';
import React from 'react';
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
  padding: 12px;
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
        <TitleText>이 구역 영업왕 되기</TitleText>
        <BanerText>이것만큼은 잘 팔 것 같다는 사람</BanerText>
      </Wrapper>
      <RegisterWrapper style={{ flexDirection: 'row' }}>
        {type == 'mylink' ? null : <BanerText>상품 등록하기</BanerText>}

        <IoIosArrowDroprightCircle size={25} color="#6E44FF" />
      </RegisterWrapper>
    </Container>
  );
};
