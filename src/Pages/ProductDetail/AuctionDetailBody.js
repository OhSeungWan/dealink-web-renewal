import { Container, ScreenWrapper } from 'Components/Atoms';
import React, { useEffect } from 'react';
import {
  getAuctionBidHistory,
  getAuctionDetail,
  useAuctionDetailDispatch,
  useAuctionDetailState
} from 'Pages/ProductDetail/AuctionDetailContext';

import Header from 'domain/Header/Header';
import ProductInfo from 'domain/Product/ProductInfo';
import { useParams } from 'react-router-dom';

// :type/:userIndex/:url
const AuctionDetailBody = () => {
  const { url, userIndex, type } = useParams();
  const userId = sessionStorage.getItem('userId');
  const state = useAuctionDetailState();
  const dispatch = useAuctionDetailDispatch();

  const { data: auction, loading, error } = state.auction;
  const { data: bidData, bidDataloading, bidDataerror } = state.bid;

  useEffect(() => {
    getAuctionDetail(dispatch, userId, url);
    getAuctionBidHistory(dispatch, url);
  }, [dispatch]);

  if (loading || bidDataloading) return <div>로딩중..</div>;
  if (error || bidDataerror) return <div>에러가 발생했습니다</div>;
  if (!auction) return null;

  return (
    <ScreenWrapper>
      <Header banner />
      <Container style={{ marginTop: 110 }}>
        <ProductInfo auction={auction} type={type} bidData={bidData} />
      </Container>
    </ScreenWrapper>
  );
};

export default AuctionDetailBody;
