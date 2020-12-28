import { AuctionOptions, ProductInfo } from 'Components/Organisms';
import { Button, Container, ScreenWrapper } from 'Components/Atoms';
import { ImageBox, InfoList } from 'Components/Molecules';

import Header from 'Components/Molecules/Header';
import React from 'react';

const ProductEnrollmentPresenter = () => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ProductInfo />
        <AuctionOptions />
        <Button primary common>
          상품등록
        </Button>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductEnrollmentPresenter;
