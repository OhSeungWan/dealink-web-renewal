import { Container, ScreenWrapper } from 'Components/Atoms';

import Header from 'domain/Header/Header';
import { MyLinkInfo } from 'Components/Organisms';
import React from 'react';

const MyLinkPresenter = () => {
  return (
    <ScreenWrapper>
      <Header />
      <Container style={{ marginTop: 50 }}>
        <MyLinkInfo />
      </Container>
    </ScreenWrapper>
  );
};

export default MyLinkPresenter;
