import { Container, ScreenWrapper } from 'Components/Atoms';

import Header from 'Components/Molecules/Header';
import { MyLinkInfo } from 'Components/Organisms';
import React from 'react';

const MyLinkPresenter = () => {
  return (
    <ScreenWrapper>
      <Header type={'mylink'} />
      <Container style={{ marginTop: 150 }}>
        <MyLinkInfo />
      </Container>
    </ScreenWrapper>
  );
};

export default MyLinkPresenter;
