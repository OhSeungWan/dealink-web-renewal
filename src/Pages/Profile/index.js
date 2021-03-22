import { Container, ScreenWrapper } from 'Components/Atoms';

import Header from 'domain/Header/Header';
// import HomeHeader from 'Pages/Home/HomeHeader';
import Profile from 'domain/User/Profile';
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
