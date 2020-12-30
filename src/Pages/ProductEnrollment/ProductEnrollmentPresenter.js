import { AccountInfo, AuctionOptions, ProductInfo } from 'Components/Organisms';
import { Border, CheckButton, Input, Text } from 'Components/Atoms';
import { Button, Container, ScreenWrapper } from 'Components/Atoms';
import { List, Timer } from 'Components/Molecules';
import { ProductEnrollmentContext, ProductEnrollmentInput } from './context';
import React, { useContext } from 'react';

import Banner1 from 'assets/img/Banner1.png';
import Header from 'Components/Molecules/Header';
import { ImageBox } from 'Components/Molecules';
import { useInput } from 'Hooks/useInput';

// TODO: 리펙토링
const ProductEnrollmentPresenter = ({ onSubmit }) => {
  const [value, onChange] = useInput({
    imageList: [],
    productTitle: '',
    productDetail: '',
    productPrice: '',
    kakaoUrl: '',
    d: '',
    h: '',
    m: '',
    s: ''
  });

  const onClick = () => {
    onSubmit(value);
  };

  return (
    <ScreenWrapper>
      <Header />
      <Container>
        <ImageBox url={Banner1} />
        <ProductInfo value={value} onChange={onChange} />
        <List>
          <Text>경매 마감일</Text>
          <Timer isSet={false} value={value} onChange={onChange} />
        </List>
        <AuctionOptions value={value} onChange={onChange} />
        <AccountInfo value={value} onChange={onChange} />
        <Button onClick={onClick} primary common>
          상품등록
        </Button>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductEnrollmentPresenter;
