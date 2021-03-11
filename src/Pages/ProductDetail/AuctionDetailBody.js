import { Container, ScreenWrapper } from 'Components/Atoms';
import React, { useEffect } from 'react';
import {
  getAuctionDetail,
  useAuctionDetailDispatch,
  useAuctionDetailState
} from 'Pages/ProductDetail/AuctionDetailContext';

import Header from 'system/Header/Header';
import ProductInfo from 'system/Product/ProductInfo';
import { useParams } from 'react-router-dom';

// :type/:userIndex/:url
const AuctionDetailBody = () => {
  const { url, userIndex, type } = useParams();
  const userId = sessionStorage.getItem('userId');
  const state = useAuctionDetailState();
  const dispatch = useAuctionDetailDispatch();

  const { data: auction, loading, error } = state.auction;

  useEffect(() => {
    getAuctionDetail(dispatch, userId, url);
  }, [dispatch]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!auction) return null;

  return (
    <ScreenWrapper>
      <Header banner />
      <Container style={{ marginTop: 110 }}>
        <ProductInfo auction={auction} type={type} />
      </Container>
    </ScreenWrapper>
  );
};

export default AuctionDetailBody;
