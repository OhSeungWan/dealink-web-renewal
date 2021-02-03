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
import { Redirect, useLocation } from 'react-router-dom';

import { FadeBox } from 'Components/Organisms/Modal';
import Header from 'Components/Molecules/Header';
import React from 'react';
import Terms from 'Components/Organisms/Terms';
import beforeBid from 'assets/img/beforeBid.png';
import styled from 'styled-components';

const ProductDetailPresenter = props => {
  const location = useLocation();
  const auctionStatus =
    props.data.auctionStatus == 'AUCTION_COMPLETED' ? true : false;
  return (
    <ScreenWrapper>
      <Header banner />
      <Container style={{ marginTop: 150 }}>
        <FadeBox
          isOpen={props.firstTime && !props.isSee}
          closeModal={props.closeFirstModal}
          doNotSeeToday={props.doNotSeeToday}
        />
        <Slider
          ImageList={props.data.imageUrls}
          big
          auctionStatus={auctionStatus}
          type="detail"
        >
          <Timer
            auctionStatus={auctionStatus}
            isSet={true}
            value={{
              d: props.days,
              h: props.hours,
              m: props.minutes,
              s: props.seconds,
              link: props.data.url
            }}
            link={props.data.url}
            fetchData={props.fetchData}
          />
        </Slider>
        <ProductInfo type={'buyer'} {...props.data} />
        <Share
          url={`https://www.dealink.co.kr/Product/seller/0/${props.data.url}`}
          data={props.data} //클립보드 복사 url
        />

        <ProductDetail {...props.data} />
        <Border height="8px" />

        <Terms />
        {!auctionStatus ? (
          <>
            <Button
              className={
                props.userInfo.isLogin ? 'login-dobid-btn' : 'dobid-btn'
              }
              style={{ position: 'fixed', bottom: 10 }}
              onClick={props.openModal}
              primary
              common
            >
              입찰 GO!
            </Button>{' '}
            <img
              src={beforeBid}
              style={{
                position: 'fixed',
                bottom: 53,
                width: '100%',
                maxWidth: 200
              }}
            />
          </>
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
            props.userInfo.isLogin ? (
              <Biddging
                data={props.data}
                userInfo={props.userInfo}
                closeModal={props.closeModal}
                isOpen={props.isOpen}
              />
            ) : (
              <Redirect
                to={{
                  pathname: '/SignIn',
                  state: { from: location.pathname }
                }}
              ></Redirect>
            )
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
