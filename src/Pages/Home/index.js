import { Container, ScreenWrapper } from 'Components/Atoms';

import AuctionList from 'system/Auction/AuctionList';
import HomeHeader from 'Pages/Home/HomeHeader';
import React from 'react';

const Home = () => {
  return (
    <ScreenWrapper>
      <HomeHeader />
      <Container>
        <AuctionList />
      </Container>
    </ScreenWrapper>
  );
};

export default Home;
