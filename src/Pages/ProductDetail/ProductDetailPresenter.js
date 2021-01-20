import {
  Biddging,
  Modal,
  Nextrankchange,
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
import { PrivateContents } from 'Routers/MainRouter';
import React from 'react';
import Terms from 'Components/Organisms/Terms';

const ProductDetailPresenter = props => {
  const auctionStatus =
    props.data.auctionStatus == 'AUCTION_COMPLETED' ? true : false;
  return (
    <ScreenWrapper>
      <Header banner />
      <Container style={{ marginTop: 150 }}>
        <Slider
          ImageList={props.data.imageUrls}
          big
          auctionStatus={auctionStatus}
          type="detail"
        />
        <ProductInfo type={'buyer'} {...props.data} />
        <Share
          url={`http://www.dealink.co.kr/Product/seller/0/${props.data.url}`}
          data={props.data} //클립보드 복사 url
        />

        <Border height="8px" />

        <List alignCenter>
          <Text style={{ textAlign: 'center' }}>Count Down</Text>
          <Timer
            auctionStatus={auctionStatus}
            isSet={true}
            days={props.days}
            hours={props.hours}
            minutes={props.minutes}
            seconds={props.seconds}
            link={props.data.url}
            fetchData={props.fetchData}
          />
        </List>

        <Border height="8px" />

        <ProductDetail {...props.data} />
        <Terms />
        {!auctionStatus ? (
          <Button
            className={props.userInfo.isLogin ? 'login-dobid-btn' : 'dobid-btn'}
            style={{ position: 'fixed', bottom: 10 }}
            onClick={props.openModal}
            primary
            common
          >
            입찰하기
          </Button>
        ) : props.data.userType == 'SELLER' ? (
          <Button
            style={{ position: 'fixed', bottom: 10, zIndex: 2 }}
            onClick={props.openModal}
            primary
            common
          >
            차순으로 변경하기
          </Button>
        ) : null}

        <Modal
          isOpen={props.isOpen}
          title={!auctionStatus ? '입찰하기' : '차순으로 변경하기'}
          height={!auctionStatus ? 80 : 80}
          closeModal={props.closeModal}
        >
          {!auctionStatus ? (
            <PrivateContents>
              <Biddging
                data={props.data}
                userInfo={props.userInfo}
                closeModal={props.closeModal}
                isOpen={props.isOpen}
              />
            </PrivateContents>
          ) : props.data.userType == 'SELLER' ? (
            <Nextrankchange
              link={props.data.url}
              closeModal={props.closeModal}
            />
          ) : null}
        </Modal>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductDetailPresenter;
