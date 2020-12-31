import {
  AccountInfo,
  AuctionOptions,
  Modal,
  ProductInfo
} from 'Components/Organisms';
import { Button, Container, ScreenWrapper, Text } from 'Components/Atoms';
import { List, Share, Timer } from 'Components/Molecules';
import React, { useContext, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import Banner1 from 'assets/img/Banner1.png';
import Header from 'Components/Molecules/Header';
import { ImageBox } from 'Components/Molecules';
import { useInput } from 'Hooks/useInput';

// TODO: 리펙토링 꼮꼬꼬꼬꼬꼮!!!
const ProductEnrollmentPresenter = ({
  onSubmit,
  closeModal,
  openModal,
  isOpen,
  data
}) => {
  const [value, onChange] = useInput({
    imageList: [],
    productTitle: '',
    productDetail: '',
    productPrice: '',
    kakaoUrl: '',
    description: '',
    d: '',
    h: '',
    m: '',
    s: ''
  });

  const onClick = async () => {
    await onSubmit(value);
    openModal();
  };

  return (
    <ScreenWrapper>
      <Container>
        <Header />
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
                  {value.productTitle} 애플워치 se
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
                  url={`http://192.168.0.107:3000/Product/seller/0/${data.url}`}
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
  );
};

export default ProductEnrollmentPresenter;
