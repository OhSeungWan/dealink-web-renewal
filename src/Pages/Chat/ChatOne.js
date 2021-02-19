import { Container, ScreenWrapper } from 'Components/Atoms';

// import HomeHeader from 'Pages/Home/HomeHeader';
import ChatOne from 'system/Chat/ChatOne';
import Header from 'system/Header/Header';
import React from 'react';

const ChatOneContainer = () => {
  return (
    <ScreenWrapper>
      <Header />
      <Container>
        <ChatOne />
      </Container>
    </ScreenWrapper>
  );
};

export default ChatOneContainer;
