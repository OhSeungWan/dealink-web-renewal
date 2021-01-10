import React, { useState } from 'react';

import Date from 'Utils/date-utils';
import ProductEnrollmentPresenter from 'Pages/ProductEnrollment/ProductEnrollmentPresenter';
import { auctionApi } from 'Apis/auctionApi';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks/useInput';
import { useSelector } from 'react-redux';

const ProductEnrollmentContainer = () => {
  // TODO: refectorying
  // const [data, isLoading, error, refetch] = useFetch()

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const userInfo = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useInput({
    imageList: [],
    productTitle: '',
    productDetail: '',
    productPrice: '',
    kakaoUrl: '',
    description: '',
    d: 0,
    h: 0,
    m: 0,
    s: 0
  });

  const closeModal = () => {
    setIsOpen(false);
    history.push(`/Product/seller/${userInfo.id}/${modalData.url}`, {
      before: true
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async () => {
    let form = new FormData();
    var now = new Date();
    if (value.imageList.length == 0) {
      //TODO: 이미지 없어도 등록할수 있도록 해야함
      alert('이미지는 필수입니다.');
      return;
    }
    if (value.productPrice == '') {
      alert('가격은 필수입니다.');
      return;
    }
    now.setDate(now.getDate() + parseInt(value.d));
    now.setHours(now.getHours() + parseInt(value.h));
    now.setMinutes(now.getMinutes() + parseInt(value.m));
    now.setSeconds(now.getSeconds() + parseInt(value.s));
    // now.setDate(now.getMonth() - 1);

    value.imageList.map(item => {
      form.append('productImages', item);
    });

    form.append(
      'auctionInfoRequest',
      JSON.stringify({
        startingPrice: value.productPrice.replaceAll(',', ''), // 경매 시작가
        currentPrice: value.productPrice.replaceAll(',', ''), // 경매 현재가
        closingTime: now.format('yyyy-MM-dd HH:mm:ss'), // 경매 마감시간
        tradingMethod: '직거래', //
        chatUrl: value.kakaoUrl, // 오픈채팅 주소
        name: value.productTitle,
        description: value.description,
        status: '0',
        url: null
      })
    );
    setLoading(false);
    const data = await auctionApi.registerAuction(userInfo.id, {
      method: 'POST',
      headers: { AUTH_TOKEN: userInfo.accessToken },
      body: form
    });
    setModalData(data);
    setLoading(true);
    openModal();
  };

  return (
    <ProductEnrollmentPresenter
      onSubmit={onSubmit}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      data={modalData}
      onChange={setValue}
      value={value}
      loading={loading}
    />
  );
};

export default ProductEnrollmentContainer;
