import { Container, ScreenWrapper } from 'Components/Atoms';

import MainBody from 'Pages/Main/MainBody';
import MainHeader from 'Pages/Main/MainHeader';
import MainTopBanner from 'Pages/Main/MainTopBanner';
import React from 'react';

const MainContainer = () => {
  return (
    <ScreenWrapper>
      <MainHeader />
      <Container>
        <MainTopBanner />
        <MainBody />
      </Container>
    </ScreenWrapper>
  );
};

export default MainContainer;
