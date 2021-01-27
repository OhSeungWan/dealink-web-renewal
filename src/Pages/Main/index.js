import { Container, ScreenWrapper } from 'Components/Atoms';

import MainBody from 'Pages/Main/MainBody';
import MainHeader from 'Pages/Main/MainHeader';
import React from 'react';

const MainContainer = () => {
  return (
    <ScreenWrapper>
      <MainHeader />
      <Container>
        <MainBody />
      </Container>
    </ScreenWrapper>
  );
};

export default MainContainer;
