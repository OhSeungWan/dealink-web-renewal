import {
  AccountInfo,
  AuctionOptions,
  Modal,
  ProductDetail,
  ProductInfo
} from 'Components/Organisms';
import { Button, Container, ScreenWrapper, Text } from 'Components/Atoms';
import { ImageBox, List, Timer } from 'Components/Molecules';

import Banner1 from 'assets/img/Banner1.png';
import Header from 'Components/Molecules/Header';
import React from 'react';

const ProductDetailPresenter = props => {
  var test = props.closingTime;
  var test2 = test;
  console.log(test2);
  const d = props.closingTime;
  console.log(String(d));
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ProductInfo type={'buyer'} imageUrl={Banner1} {...props} />
        <List>
          <Text>Count Down</Text>
          <Timer isSet={true} closingTime={props.closingTime} />
        </List>
        <ProductDetail {...props} />
        <Button primary common>
          입찰하기
        </Button>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductDetailPresenter;
