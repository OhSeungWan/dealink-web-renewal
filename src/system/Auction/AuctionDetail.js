import React, { useState } from 'react';
import { getCookie, setCookie } from 'lib/Cookies';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

const AuctionDetail = () => {
  const { url } = useParams();
  const location = useLocation();

  const [firstTime, setFirstTime] = useState(true);
  const [isSee, setIsSee] = useState(getCookie('isSee'));
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState({ auctionDetail: {}, loading: false });

  const userId = useSelector(state =>
    state.user.id !== 'undefined' && state.user.id !== 'null' && state.user.id
      ? userInfo.id
      : '0'
  );

  const closeFirstModal = () => {
    setFirstTime(false);
  };

  const doNotSeeToday = () => {
    setIsSee(true);
    setCookie('isSee', 'true', 1);
  };

  const closeModal = () => {
    setIsOpen(false);
    // fetchData();
  };

  const openModal = () => {
    setCookie('before', location.pathname, 1);
    setIsOpen(true);
  };

  const getAuctionDetail = async () => {
    setData(state => ({ ...state, loading: false }));
    const res = await fetch(`${REQUEST_URL}${userId}/auction/${url}`);
    const data = await res.json();
    setData(state => ({ ...state, auctionDetail: data, loading: true }));
  };

  return <div></div>;
};

export default AuctionDetail;
