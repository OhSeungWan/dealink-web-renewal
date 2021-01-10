import {
  AccountInfo,
  AuctionOptions,
  Modal,
  ProductInfo
} from 'Components/Organisms';
import { Button, Container, ScreenWrapper, Text } from 'Components/Atoms';
import { List, Share, Timer } from 'Components/Molecules';

import { AiOutlineClose } from 'react-icons/ai';
import Header from 'Components/Molecules/Header';
import { ImageBox } from 'Components/Molecules';
import { Loading } from 'Components/Organisms/Modal';
import React from 'react';
import panmeza from 'assets/img/panmeza.png';

// TODO: 리펙토링 꼮꼬꼬꼬꼬꼮!!!
const ProductEnrollmentPresenter = ({
  onSubmit,
  closeModal,
  onChange,
  value,
  isOpen,
  data,
  loading
}) => {
  return loading ? (
    <ScreenWrapper>
      <Header />
      <Container>
        {/* <ImageBox url={panmeza} /> */}
        <ProductInfo value={value} onChange={onChange} />
        <List alignCenter={true}>
          <div
            style={{
              display: 'flex',
              width: '90%',
              alignItems: 'center',
              marginBottom: 10
            }}
          >
            <div>경매 마감일</div>
            <div style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
              경매 진행 시간을 설정해 주세요.
            </div>
          </div>
          <Timer isSet={false} value={value} onChange={onChange} />
        </List>
        <AuctionOptions value={value} onChange={onChange} />
        <AccountInfo value={value} onChange={onChange} />
        <Button
          onClick={onSubmit}
          primary
          common
          style={{ position: 'relative', bottom: 5 }}
        >
          상품등록
        </Button>
        {/* <Loading isOpen={true}></Loading> */}
        <Modal isOpen={isOpen}>
          {data && (
            <div
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                <AiOutlineClose size={30} onClick={closeModal} />
              </div>
              <div style={{ fontSize: 30, color: '#6E44FF', margin: 20 }}>
                (ஐ╹◡╹)ノ
              </div>
              <div style={{ fontSize: 30, color: '#6E44FF' }}>
                상품업로드 완료
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 20
                }}
              >
                <div style={{ fontWeight: 700, flex: 1 }}>상품명</div>
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
              <div style={{ color: '#6E44FF' }}>
                생성된 링크들은 내링크 관리'에서 확인할 수 있습니다.
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
