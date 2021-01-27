import React, { useState } from 'react';

import AuctionRegisterInputForm from 'system/Auction/AuctionRegisterInputForm';
import Date from 'Utils/date-utils';
import { auctionApi } from 'Apis/auctionApi';
import { useProduct } from 'Hooks/useProduct';
import { useSelector } from 'react-redux';

const AuctionRegister = () => {
  const userInfo = useSelector(state => state.user);

  const [value, setValue, loading, setLoading, validate] = useProduct();
  const [modalData, setModalData] = useState();

  const calcClosingDate = () => {
    let now = new Date();

    now.setDate(now.getDate() + parseInt(value.d));
    now.setHours(now.getHours() + parseInt(value.h));
    now.setMinutes(now.getMinutes() + parseInt(value.m));
    now.setSeconds(now.getSeconds() + parseInt(value.s));

    return now.format('yyyy-MM-dd HH:mm:ss');
  };

  const makeAuctionFormData = () => {
    let form = new FormData();

    value.imageList.map(item => {
      form.append('productImages', item);
    });
    form.append(
      'auctionInfoRequest',
      JSON.stringify({
        startingPrice: value.productPrice.replace(/[^0-9]/g, ''), // 경매 시작가
        currentPrice: value.productPrice.replace(/[^0-9]/g, ''), // 경매 현재가
        closingTime: calcClosingDate(), // 경매 마감시간
        tradingMethod: '직거래', //
        chatUrl: 'https://open.kakao.com/o/gDbtKmTc', // 오픈채팅 주소
        name: value.productTitle,
        description: value.description,
        status: '0',
        url: null
      })
    );

    return form;
  };

  const onRegisterAuction = async () => {
    if (validate()) {
      return;
    }

    const fromData = makeAuctionFormData();
    setLoading(false);
    const data = await auctionApi.registerAuction(userInfo.id, {
      method: 'POST',
      headers: {
        AUTH_TOKEN: userInfo.accessToken
      },
      body: fromData
    });
    setLoading(true);
  };

  return (
    <>
      <AuctionRegisterInputForm onChange={setValue} value={value} />
    </>
  );
};

export default AuctionRegister;
