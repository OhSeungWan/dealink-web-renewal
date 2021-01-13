import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Date from 'Utils/date-utils';
import ProductEnrollmentPresenter from 'Pages/ProductEnrollment/ProductEnrollmentPresenter';
import { auctionApi } from 'Apis/auctionApi';
import { useFetch } from 'Hooks/useFetch';
import { useInput } from 'Hooks/useInput';
import { useSelector } from 'react-redux';

const ProductEnrollmentContainer = () => {
  // TODO: refectorying
  // const [data, isLoading, error, refetch] = useFetch()
  const userInfo = useSelector(state => state.user);

  const userId = userInfo.id || '0';
  const location = useLocation();
  const [templink, setTempLink] = useState(
    'd3110cd3-1f24-4798-9a4c-239212d480e0-20210113181515'
  );
  console.log(location);

  //TODO: 리펙토링
  const [tempdata, isLoading, error, refetch] = useFetch(
    `https://rest.dealink.co.kr/user/${userId}/auction/${templink}`
    // `http://192.168.0.102:8080/user/${userId}/auction/${url}`
  );

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [loading, setLoading] = useState(true);
  const [isTemp, setIsTemp] = useState(true);
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

  const valueValidate = () => {
    if (
      value.imageList.length == 0 ||
      value.productPrice == '' ||
      value.kakaoUrl == ''
    ) {
      setIsTemp(true);
    } else {
      setIsTemp(false);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    if (isTemp) {
      history.push(`/MyLink`, {
        before: true
      });
    } else {
      history.push(`/Product/seller/${userInfo.id}/${modalData.url}`, {
        before: true
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async () => {
    let form = new FormData();
    let now = new Date();
    // if (value.imageList.length == 0) {
    //   //TODO: 이미지 없어도 등록할수 있도록 해야함
    //   alert('이미지는 필수입니다.');
    //   return;
    // }
    // if (value.productPrice == '') {
    //   console.log(value);

    //   alert('가격은 필수입니다.');
    //   return;
    // }
    now.setDate(now.getDate() + parseInt(value.d));
    now.setHours(now.getHours() + parseInt(value.h));
    now.setMinutes(now.getMinutes() + parseInt(value.m));
    now.setSeconds(now.getSeconds() + parseInt(value.s));
    // now.setDate(now.getMonth() - 1);

    value.imageList.map(item => {
      form.append('productImages', item);
    });
    // alert(value.productPrice.replace(/[^0-9]/g, ''));
    form.append(
      'auctionInfoRequest',
      JSON.stringify({
        startingPrice: value.productPrice.replace(/[^0-9]/g, ''), // 경매 시작가
        currentPrice: value.productPrice.replace(/[^0-9]/g, ''), // 경매 현재가
        closingTime: now.format('yyyy-MM-dd HH:mm:ss'), // 경매 마감시간
        tradingMethod: '직거래', //
        chatUrl: value.kakaoUrl, // 오픈채팅 주소
        name: value.productTitle,
        description: value.description,
        status: isTemp ? '6' : '0',
        url: null
      })
    );
    setLoading(false);
    const data = await auctionApi.registerAuction(userInfo.id, {
      method: 'POST',
      headers: {
        AUTH_TOKEN: userInfo.accessToken
      },
      body: form
    });
    setModalData(data);
    setLoading(true);
    openModal();
  };

  useEffect(() => {
    if (templink && isLoading) {
      console.log('it is temp');
      console.log(tempdata);
      setValue({
        imageList: [],
        productTitle: tempdata.name,
        productDetail: tempdata.description,
        productPrice: tempdata.startingPrice,
        kakaoUrl: tempdata.chatUrl,
        description: tempdata.description,
        d: 0,
        h: 0,
        m: 0,
        s: 0
      });
    }
  }, [isLoading]);

  return (
    isLoading && (
      <ProductEnrollmentPresenter
        onSubmit={onSubmit}
        closeModal={closeModal}
        isOpen={isOpen}
        openModal={openModal}
        data={modalData}
        onChange={setValue}
        value={value}
        loading={loading}
        isTemp={isTemp}
        valueValidate={valueValidate}
        tempdata={tempdata}
        templink={templink}
      />
    )
  );
};

export default ProductEnrollmentContainer;
