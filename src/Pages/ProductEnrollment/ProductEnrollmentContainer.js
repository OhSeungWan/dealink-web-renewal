import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Date from 'Utils/date-utils';
import ProductEnrollmentPresenter from 'Pages/ProductEnrollment/ProductEnrollmentPresenter';
import { useHistory } from 'react-router-dom';

const ProductEnrollmentContainer = () => {
  // TODO: refectorying

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [userInfo, setUserInfo] = useState();

  console.log(Cookies.get('accessToken'));

  const closeModal = () => {
    console.log('modal open');
    setIsOpen(false);
    history.push(`/Product/seller/${userInfo.id}/${data.url}`, {
      before: true
    });
  };

  const openModal = () => {
    console.log('modal open');
    setIsOpen(true);
  };

  const onSubmit = async input => {
    let form = new FormData();

    var now = new Date();
    console.log('시간:');
    console.log(input);

    now.setDate(input.d);
    now.setMonth(now.getMonth() + 1);
    console.log(now.format('yyyy-MM-dd hh:mm:ss'));
    // TODO:이미지 1개만 가도록 해놓음
    input.imageList.map(item => {
      form.append('productImages', item);
    });
    form.append(
      'auctionInfoRequest',
      JSON.stringify({
        startingPrice: input.productPrice, // 경매 시작가
        currentPrice: input.productPrice, // 경매 현재가
        closingTime: now.format('yyyy-MM-dd hh:mm:ss'), // 경매 마감시간
        tradingMethod: '직거래', //
        chatUrl: input.kakaoUrl, // 오픈채팅 주소
        name: input.productTitle,
        description: input.description
      })
    );

    const res = await fetch(`http://192.168.0.120:8080/user/1/auction`, {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    const getCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const res = await fetch(
        `http://192.168.0.120:8080/user/authentication/code?code=${code}`
      );
      const data = await res.json();
      setUserInfo(data);
      console.log(data);
      Cookies.set('accessToken', data.accessToken);
      Cookies.set('userInfo', data.id);

      if (Cookies.get('beforePage')) {
        history.push(Cookies.get('beforePage'));
      }
    };

    getCode();
  }, []);

  return (
    <ProductEnrollmentPresenter
      onSubmit={onSubmit}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      data={data}
    />
  );
};

export default ProductEnrollmentContainer;
