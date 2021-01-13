import { Container, ScreenWrapper } from 'Components/Atoms';

import Header from 'Components/Molecules/Header';
import { MyLinkInfo } from 'Components/Organisms';
import React from 'react';

const MyLinkPresenter = () => {
  return (
    <ScreenWrapper>
      <Header banner type={'mylink'} />
      <Container style={{ marginTop: 250 }}>
        <MyLinkInfo />
      </Container>
    </ScreenWrapper>
  );
};

export default MyLinkPresenter;
