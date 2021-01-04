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
import { List, Share, Slider, Timer } from 'Components/Molecules';

import Header from 'Components/Molecules/Header';
import React from 'react';

const ProductDetailPresenter = props => {
  return (
    <ScreenWrapper>
      <Container>
        <Header banner />
        <Slider ImageList={props.data.imageUrls} big />
        <ProductInfo type={'buyer'} {...props.data} />
        <Share
          url={`http://192.168.0.107:3000/Product/seller/0/${props.data.url}`} //클립보드 복사 url
        />

        <Border height="8px" />

        <List alignCenter>
          <Text>Count Down</Text>
          <Timer
            isSet={true}
            days={props.days}
            hours={props.hours}
            minutes={props.minutes}
            seconds={props.seconds}
          />
        </List>

        <Border height="8px" />

        <ProductDetail {...props.data} />

        {/* {props.data.userType != 'SELLER' && ( */}
        <Button onClick={props.openModal} primary common>
          입찰하기
        </Button>
        {/* )} */}

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
