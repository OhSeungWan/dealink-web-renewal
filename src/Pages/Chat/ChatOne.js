import { Container, ScreenWrapper } from 'Components/Atoms';

// import HomeHeader from 'Pages/Home/HomeHeader';
import ChatOne from 'domain/Chat/ChatOne';
import Header from 'domain/Header/Header';
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
