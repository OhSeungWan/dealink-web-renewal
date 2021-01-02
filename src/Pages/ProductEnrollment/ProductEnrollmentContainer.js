import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Date from 'Utils/date-utils';
import ProductEnrollmentPresenter from 'Pages/ProductEnrollment/ProductEnrollmentPresenter';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks/useInput';
import { useSelector } from 'react-redux';

const ProductEnrollmentContainer = () => {
  // TODO: refectorying
  // const [data, isLoading, error, refetch] = useFetch()
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState();
  const userInfo = useSelector(state => state.user);
  console.log(userInfo);

  const [value, setValue] = useInput({
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

  const closeModal = () => {
    setIsOpen(false);
    history.push(`/Product/seller/${userInfo.id}/${url}`, {
      before: true
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async () => {
    let form = new FormData();
    var now = new Date();
    now.setDate(value.d);
    now.setMonth(now.getMonth() + 1);
    value.imageList.map(item => {
      form.append('productImages', item);
    });
    form.append(
      'auctionInfoRequest',
      JSON.stringify({
        startingPrice: value.productPrice, // 경매 시작가
        currentPrice: value.productPrice, // 경매 현재가
        closingTime: now.format('yyyy-MM-dd hh:mm:ss'), // 경매 마감시간
        tradingMethod: '직거래', //
        chatUrl: value.kakaoUrl, // 오픈채팅 주소
        name: value.productTitle,
        description: value.description
      })
    );

    const res = await fetch(
      `http://192.168.0.120:8080/user/${userInfo.id}/auction`,
      {
        method: 'POST',
        body: form
      }
    );

    const data = await res.json();
    console.log(data);
    setUrl(data.url);

    openModal();
  };

  return (
    <ProductEnrollmentPresenter
      onSubmit={onSubmit}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      url={url}
      onChange={setValue}
      value={value}
    />
  );
};

export default ProductEnrollmentContainer;
