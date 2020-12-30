import React, { useEffect, useState } from 'react';

import Date from 'Utils/date-utils';
import ProductEnrollmentPresenter from 'Pages/ProductEnrollment/ProductEnrollmentPresenter';

const ProductEnrollmentContainer = () => {
  // TODO: refectorying
  const onSubmit = async input => {
    let form = new FormData();

    var now = new Date();
    console.log(input.imageList[0]);

    now.setDate((input.d = 0));
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
        name: input.productTitle
      })
    );
    console.log(form);

    const data = await fetch(`http://192.168.0.102:8080/user/1/auction`, {
      method: 'POST',
      body: form
    });

    console.log(await data.json());
  };

  useEffect(() => {
    const getCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const data = await fetch(
        `http://192.168.0.120:8080/user/authentication/code?code=${code}`
      );
      console.log(await data.json());
    };

    getCode();
  }, []);

  return <ProductEnrollmentPresenter onSubmit={onSubmit} />;
};

export default ProductEnrollmentContainer;
