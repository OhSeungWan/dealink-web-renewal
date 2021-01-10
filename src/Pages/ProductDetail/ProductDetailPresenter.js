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

import { FadeBox } from 'Components/Organisms/Modal';
import Header from 'Components/Molecules/Header';
import React from 'react';

const ProductDetailPresenter = props => {
  return (
    <ScreenWrapper>
      <Header
        banner
        front={props.data.auctionStatus == 'AUCTION_COMPLETED' ? true : false}
      />
      <Container style={{ marginTop: 150 }}>
        <Slider ImageList={props.data.imageUrls} big />
        <ProductInfo type={'buyer'} {...props.data} />
        <Share
          url={`http://www.dealink.co.kr/Product/seller/0/${props.data.url}`}
          // url={`http://192.168.0.102:8080/Product/seller/0/${props.data.url}`}
          data={props.data} //클립보드 복사 url
        />

        <Border height="8px" />

        <List alignCenter>
          <Text>Count Down</Text>
          {props.data.auctionStatus != 'AUCTION_COMPLETED' && (
            <Timer
              isSet={true}
              days={props.days}
              hours={props.hours}
              minutes={props.minutes}
              seconds={props.seconds}
              link={props.data.url}
            />
          )}
        </List>

        <Border height="8px" />

        <ProductDetail {...props.data} />

        {props.data.auctionStatus != 'AUCTION_COMPLETED' ? (
          <Button
            style={{ position: 'fixed', bottom: 10 }}
            onClick={props.openModal}
            primary
            common
          >
            입찰하기
          </Button>
        ) : (
          <Button
            style={{ position: 'fixed', bottom: 10, zIndex: 99999 }}
            onClick={() => {
              alert('차순으로 변경하시겠습니까?');
            }}
            primary
            common
          >
            차순으로 변경하기
          </Button>
        )}

        <Modal isOpen={props.isOpen}>
          <Biddging
            data={props.data}
            userInfo={props.userInfo}
            closeModal={props.closeModal}
          />
        </Modal>
        <FadeBox
          isOpen={
            props.data.auctionStatus == 'AUCTION_COMPLETED' ? true : false
          }
        ></FadeBox>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductDetailPresenter;
