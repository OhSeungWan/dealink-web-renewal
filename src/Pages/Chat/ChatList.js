import { Container, ScreenWrapper } from 'Components/Atoms';

// import HomeHeader from 'Pages/Home/HomeHeader';
import ChatList from 'domain/Chat/ChatList';
import Header from 'domain/Header/Header';
import React from 'react';

const ChatOneContainer = () => {
  return (
    <ScreenWrapper>
      <Header />
      <Container>
        <ChatList />
      </Container>
    </ScreenWrapper>
  );
};

export default ChatOneContainer;
