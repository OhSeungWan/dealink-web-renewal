import {
  Bidding,
  Modal,
  Nextrankchange,
  ProductDetail,
  ProductInfo
} from 'Components/Organisms';
import { Border, Button, Container, ScreenWrapper } from 'Components/Atoms';
import { Redirect, useLocation } from 'react-router-dom';
import { Share, Slider, Timer } from 'Components/Molecules';

import { FadeBox } from 'Components/Organisms/Modal';
import Header from 'system/Header/Header';
import React from 'react';
import Terms from 'Components/Organisms/Terms';
import beforeBid from 'assets/img/beforeBid.png';

const ProductDetailPresenter = props => {
  const location = useLocation();
  const { auctionItemdata } = props;
  const auctionStatus =
    auctionItemdata.auctionStatus === 'AUCTION_COMPLETED' ? true : false;
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
          ImageList={auctionItemdata.imageUrls}
          big
          auctionStatus={auctionStatus}
          type="detail"
        >
          <Timer
            auctionStatus={auctionStatus}
            isSet={true}
            closingTime={auctionItemdata.closingTime}
            link={auctionItemdata.url}
            fetchData={props.fetchData}
          />
          {/* <div className="imgcount">asdf</div> */}
        </Slider>
        <ProductInfo type={'buyer'} {...auctionItemdata} />
        <Share
          url={`https://www.dealink.co.kr/Product/seller/0/${auctionItemdata.url}`}
          data={auctionItemdata} //클립보드 복사 url
        />

        <ProductDetail {...auctionItemdata} />
        <Border height="8px" />
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <button
            style={{
              width: '70px',
              marginBottom: 10,
              border: 'none',
              backgroundColor: '#6E44FF',
              color: 'white',
              borderRadius: 5
            }}
            onClick={() => {
              setTimeout(() => {
                alert(
                  '신고접수가 완료되었습니다. 내용 검토후 조치될 예정입니다.'
                );
              }, 800);
            }}
          >
            신고하기
          </button>
          <div style={{ fontSize: 10 }}>
            부적절한 컨텐츠가 포함된 경우 해당 게시물을 신고할수 있습니다.
            무분별한 신고는 서비스 제한의 원인이 될 수 있습니다.
          </div>
        </div>
        <Terms />
        {!auctionStatus ? (
          <>
            <Button
              className={props.userInfo ? 'login-dobid-btn' : 'dobid-btn'}
              style={{ position: 'fixed', bottom: 10 }}
              onClick={props.openModal}
              primary
              common
            >
              입찰 GO!
            </Button>
            <img
              src={beforeBid}
              style={{
                position: 'fixed',
                bottom: 53,
                width: '100%',
                maxWidth: 200
              }}
              alt="no"
            />
          </>
        ) : auctionItemdata.userType === 'SELLER' ? (
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
            props.userInfo && props.userInfo !== 'undefined' ? (
              <Bidding
                data={auctionItemdata}
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
          ) : auctionItemdata.userType === 'SELLER' ? (
            <Nextrankchange
              link={auctionItemdata.url}
              closeModal={props.closeModal}
            />
          ) : null}
        </Modal>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductDetailPresenter;
