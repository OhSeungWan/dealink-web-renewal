import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Cookies from 'js-cookie';
import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';
import { useFetch } from 'Hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailContainer = () => {
  const { url } = useParams();
  const userInfo = useSelector(state => (state.user ? state.user : 0));
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hitory = useHistory();
  //getAuction
  const [data, isLoading, error, refetch] = useFetch(
    `  http://192.168.0.120:8080/user/${userInfo.id}/auction/${url}`
  );

  const closeModal = () => {
    setIsOpen(false);
    refetch(true);
  };

  const openModal = () => {
    if (sessionStorage.getItem('userInfo')) {
      setIsOpen(true);
    } else {
      alert('로그인 후 사용해주세요');
      Cookies.set('beforePage', location.pathname);
      hitory.push('/SignIn');
    }
  };

  return (
    isLoading && (
      <ProductDetailPresenter
        data={data}
        closeModal={closeModal}
        openModal={openModal}
        isOpen={isOpen}
        userInfo={userInfo}
      />
    )
  );
};

export default ProductDetailContainer;
