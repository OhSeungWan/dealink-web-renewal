import { Container, ScreenWrapper } from 'Components/Atoms';

import Header from 'system/Header/Header';
// import HomeHeader from 'Pages/Home/HomeHeader';
import Profile from 'system/User/Profile';
import React from 'react';

const ChatOneContainer = () => {
  return (
    <ScreenWrapper>
      <Header />
      <Container>
        <Profile />
      </Container>
    </ScreenWrapper>
  );
};

export default ChatOneContainer;
