import { Container, ScreenWrapper } from 'Components/Atoms';

// import HomeHeader from 'Pages/Home/HomeHeader';
import ChatList from 'system/Chat/ChatList';
import Header from 'system/Header/Header';
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
