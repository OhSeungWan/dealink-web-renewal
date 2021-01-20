import React, { useState } from 'react';

import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';
import { useFetch } from 'Hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailContainer = () => {
  const { url } = useParams();
  const userInfo = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  //로그인 하지 않은 사용자일 경우
  const userId = userInfo.id || '0';
  const [data, isLoading, error, refetch] = useFetch(
    `https://rest.dealink.co.kr/user/${userId}/auction/${url}`
    // `http://192.168.0.102:8080/user/${userId}/auction/${url}`
  );
  const fetchData = () => {
    refetch(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    fetchData();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    isLoading && (
      <ProductDetailPresenter
        data={data}
        closeModal={closeModal}
        openModal={openModal}
        isOpen={isOpen}
        userInfo={userInfo}
        days={data.days}
        hours={data.hours}
        minutes={data.minutes}
        seconds={data.seconds}
        fetchData={fetchData}
      />
    )
  );
};

export default ProductDetailContainer;
