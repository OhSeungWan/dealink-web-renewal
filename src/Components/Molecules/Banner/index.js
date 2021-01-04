import { IoIosArrowDroprightCircle } from 'react-icons/io';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: #f5f5f7;
  padding: 12px;
  display: flex;
`;

const BanerText = styled.div`
  color: #3f3e43;
`;
const TitleText = styled.div`
  font-size: 23px;
  color: #6e44ff;
  padding: 3px 0px 3px 0px;
`;

// TODO: 페이지별 나타나는 조건 설정해 줘야함

export const BannerTop = () => {
  const history = useHistory();
  const userInfo = useSelector(state => state.user);
  const onClick = () => {
    if (userInfo.accessToken) {
      history.push('/ProductEnrollment');
      return;
    }
    history.push('/SignIn');
  };
  return (
    <Container onClick={onClick}>
      <Wrapper style={{ flex: 1 }}>
        <TitleText>이 구역 영업왕 되기</TitleText>
        <BanerText>이것만큼은 잘 팔 것 같다는 사람</BanerText>
      </Wrapper>
      <RegisterWrapper style={{ flexDirection: 'row' }}>
        <BanerText>상품 등록하기</BanerText>
        <IoIosArrowDroprightCircle size={30} color="#6E44FF" />
      </RegisterWrapper>
    </Container>
  );
};
