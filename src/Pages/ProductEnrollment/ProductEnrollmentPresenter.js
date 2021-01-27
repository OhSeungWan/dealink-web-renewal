import {
  AccountInfo,
  AuctionOptions,
  Modal,
  ProductInfo
} from 'Components/Organisms';
import { Border, Button, Container, ScreenWrapper } from 'Components/Atoms';
import { List, Share, Timer } from 'Components/Molecules';

import Banner1 from 'assets/img/Banner1.png';
import Header from 'Components/Molecules/Header';
import { ImageBox } from 'Components/Molecules';
import { Loading } from 'Components/Organisms/Modal';
import React from 'react';
import Terms from 'Components/Organisms/Terms';
import panmeza from 'assets/img/panmeza.png';

// TODO: 리펙토링 꼮꼬꼬꼬꼬꼮!!!
const ProductEnrollmentPresenter = ({
  onSubmit,
  closeModal,
  onChange,
  value,
  isOpen,
  data,
  loading,
  templink,
  tempdata,
  userInfo,
  bannerType
}) => {
  const banner =
    bannerType == '/Main'
      ? Banner1
      : bannerType == '/Survey'
      ? panmeza
      : Banner1;
  return loading ? (
    <ScreenWrapper>
      <Header />
      <Container>
        {!userInfo.isLogin && <ImageBox url={banner} />}
        {bannerType != '/Survey' && (
          <>
            <div
              style={{
                width: `100%`,
                fontSize: 18,
                margin: '10px 10px',
                fontWeight: 500
              }}
            >
              중고품 경매 커뮤니티
            </div>
            <div>
              딜링크는 중고로 팔고싶은 상품을 공유하는 커뮤니티 입니다. 링크로
              내 상품을 친구에게 공유해보세요!
            </div>
          </>
        )}
        <Border height={'8px'} />
        <div style={{ fontSize: 20, fontWeight: 400 }}>딜링크에 상품등록</div>
        <Border height={'1px'} />
        <ProductInfo
          value={value}
          onChange={onChange}
          tempdata={tempdata}
          templink={templink}
        />
        <List alignCenter={true}>
          <div
            style={{
              display: 'flex',
              width: '90%',
              alignItems: 'center',
              marginBottom: 10
            }}
          >
            <div style={{ fontSize: 18 }}>경매 진행기간</div>
            <div style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
              경매 진행 시간을 설정해 주세요.
            </div>
          </div>
          <Timer isSet={false} value={value} onChange={onChange} />
        </List>
        <AuctionOptions value={value} onChange={onChange} />
        <Terms />
        {/* <AccountInfo value={value} onChange={onChange} /> */}
        {userInfo.isLogin && (
          <Button
            onClick={onSubmit}
            primary
            common
            style={{ position: 'fixed', bottom: 5 }}
          >
            상품등록
          </Button>
        )}
        <Modal isOpen={isOpen} closeModal={closeModal}>
          {data && loading && (
            <div
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: 30, color: '#6E44FF', margin: 20 }}>
                (ஐ╹◡╹)ノ
              </div>
              <div style={{ fontSize: 30, color: '#6E44FF' }}>
                {data.auctionStatus == 'TEMPORARY_SAVE'
                  ? '임시저장 완료'
                  : '상품업로드 완료'}
              </div>
              {data.auctionStatus != 'TEMPORARY_SAVE' && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      padding: 20
                    }}
                  >
                    <div style={{ fontWeight: 700, flex: 1, minWidth: 50 }}>
                      상품명
                    </div>
                    <div style={{ flex: 7, textAlign: 'center' }}>
                      {value.productTitle}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      padding: 20
                    }}
                  >
                    <Share
                      url={`http://www.dealink.co.kr/Product/seller/0/${data.url}`}
                      // url={`http://192.168.0.102:8080/Product/seller/0/${data.url}`}
                      data={data}
                    />
                  </div>
                </>
              )}
              <div style={{ color: '#6E44FF' }}>
                {data.auctionStatus == 'TEMPORARY_SAVE'
                  ? '임시저장된 링크'
                  : '생성된 링크'}
                들은 '내링크 관리'에서 확인할 수 있습니다.
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </ScreenWrapper>
  ) : (
    <ScreenWrapper>
      <Container>
        <Loading isOpen={true}></Loading>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductEnrollmentPresenter;
