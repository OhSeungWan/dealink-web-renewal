import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Date from 'Utils/date-utils';
import { Loading } from 'Components/Organisms/Modal';
import ProductEnrollmentPresenter from 'Pages/ProductEnrollment/ProductEnrollmentPresenter';
import { auctionApi } from 'Apis/auctionApi';
import { useProduct } from 'Hooks/useProduct';
import { useSelector } from 'react-redux';

const ProductEnrollmentContainer = () => {
  // TODO: refectorying
  const userInfo = useSelector(state => state.user);

  const location = useLocation();
  const [templink, setTempLink] = useState(location.state?.templink);

  //TODO: 리펙토링

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [value, setValue, loading, setLoading] = useProduct(templink);
  const [isTemp, setIsTemp] = useState(true);
  const valueValidate = value => {
    if (
      value.imageList.length == 0 ||
      value.productPrice == '' ||
      value.kakaoUrl == ''
    ) {
      setIsTemp(true);
      return true;
    } else {
      setIsTemp(false);
      return false;
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
    if (isTemp) {
      alert('임시저장 됩니다.');
    }
    now.setDate(now.getDate() + parseInt(value.d));
    now.setHours(now.getHours() + parseInt(value.h));
    now.setMinutes(now.getMinutes() + parseInt(value.m));
    now.setSeconds(now.getSeconds() + parseInt(value.s));

    value.imageList.map(item => {
      form.append('productImages', item);
    });
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
        url: templink ? templink.replace('/', '') : null
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
    valueValidate(value);
    console.log(value);
    console.log(isTemp);
  }, [value]);

  return loading ? (
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
      templink={templink}
      userInfo={userInfo}
      bannerType={location.pathname}
    />
  ) : (
    <Loading isOpen={true} />
  );
};

export default ProductEnrollmentContainer;
