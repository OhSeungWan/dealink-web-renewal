import {
  Biddging,
  Modal,
  ProductDetail,
  ProductInfo
} from 'Components/Organisms';
import {
  Border,
  Button,
  Container,
  ScreenWrapper,
  Text
} from 'Components/Atoms';
import { ImageBox, List, Share, Slider, Timer } from 'Components/Molecules';
import React, { useState } from 'react';

import Header from 'Components/Molecules/Header';

const ProductDetailPresenter = props => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <Slider ImageList={props.data.imageUrls} big />
        <ProductInfo type={'buyer'} {...props.data} />
        <Share
          url={`http://192.168.0.107:3000/Product/seller/0/${props.data.url}`} //클립보드 복사 url
        />

        <Border height="8px" />

        <List alignCenter>
          <Text>Count Down</Text>
          <Timer isSet={true} closingTime={props.data.closingTime} />
        </List>

        <Border height="8px" />

        <ProductDetail {...props.data} />

        {props.data.userType != 'SELLER' && (
          <Button onClick={props.openModal} primary common>
            입찰하기
          </Button>
        )}

        <Modal isOpen={props.isOpen}>
          <Biddging
            data={props.data}
            userInfo={props.userInfo}
            closeModal={props.closeModal}
          />
        </Modal>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductDetailPresenter;
