import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Cookies from 'js-cookie';
import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';
import { useLocation } from 'react-router-dom';

const ProductDetailContainer = () => {
  const [data, setData] = useState();
  const { type, userIndex, url } = useParams();
  const [userInfo, setUserInfo] = useState(userIndex);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hitory = useHistory();
  const closeModal = () => {
    console.log('modal open');
    setIsOpen(false);
  };
  console.log(location.pathname);
  const openModal = () => {
    if (Cookies.get('accessToken')) {
      setIsOpen(true);
    } else {
      alert('로그인 후 사용해주세요');
      Cookies.set('beforePage', location.pathname);
      hitory.push('/SignIn');
    }
    console.log('modal open');
  };

  useEffect(() => {
    const getAuction = async () => {
      const res = await fetch(
        `http://192.168.0.120:8080/user/${userIndex}/auction/${url}`
      );
      const data = await res.json();
      console.log(data);
      setData(data);
      setLoading(true);
    };

    getAuction();
  }, []);

  return (
    loading && (
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
