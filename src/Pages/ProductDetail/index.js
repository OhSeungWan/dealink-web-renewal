import AuctionDetailBody from 'Pages/ProductDetail/AuctionDetailBody';
import AuctionDetailBottom from 'Pages/ProductDetail/AuctionDetailBottom';
import AuctionDetailModal from 'Pages/ProductDetail/AuctionDetailModal';
import { AuctionDetailProvider } from './AuctionDetailContext';
import React from 'react';

const AuctionDetail = () => {
  return (
    <AuctionDetailProvider>
      <AuctionDetailBody />
      <AuctionDetailModal />
      {/* <AuctionDetailBottom /> */}
    </AuctionDetailProvider>
  );
};

export default AuctionDetail;
