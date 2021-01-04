import { Button, Text } from 'Components/Atoms';
import { useHistory, useLocation } from 'react-router-dom';

import { BannerTop } from 'Components/Molecules';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const HeaderText = styled.div`
  font-weight: 700;
  font-size: 25px;
  text-align: left;
  padding: 15px;
  flex: 1;
  color: white;
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  position: fixed;
  top: 0;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: left;
  background-color: #6e44ff;
  max-height: 50px;
  padding: 15px 0px 15px 0px;
  justify-content: center;
  align-items: center;
`;

const MyLinkWrapper = styled.div``;

const MyLink = () => {
  return (
    <MyLinkWrapper>
      <Button secondary>내 링크 관리</Button>
    </MyLinkWrapper>
  );
};
const Header = ({ banner }) => {
  const userInfo = useSelector(state => state.user);
  const location = useLocation();

  console.log(`location : ${location.pathname}`);
  return (
    <HeaderWrapper>
      {banner && <BannerTop></BannerTop>}
      <HeaderContainer>
        <HeaderText> DeaLink</HeaderText>
        {userInfo.accessToken && <MyLink></MyLink>}
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
