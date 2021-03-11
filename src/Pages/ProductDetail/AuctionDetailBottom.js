import React, { useEffect } from 'react';
import {
  getAuctionDetail,
  useAuctionDetailDispatch,
  useAuctionDetailState
} from 'Pages/ProductDetail/AuctionDetailContext';

import { ScreenWrapper } from 'Components/Atoms';
import { useParams } from 'react-router-dom';

// :type/:userIndex/:url
const AuctionDetailBottom = () => {
  const { url, userIndex, type } = useParams();
  const userId = sessionStorage.getItem('userId');
  const state = useAuctionDetailState();
  const dispatch = useAuctionDetailDispatch();

  const { data: auction, loading, error } = state.auction;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!auction) return null;

  return <ScreenWrapper></ScreenWrapper>;
};

export default AuctionDetailBottom;
