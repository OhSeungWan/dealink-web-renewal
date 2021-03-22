import AuctionRegister from 'domain/Auction/AuctionRegister';
import React from 'react';
import afterBid from 'assets/img/afterBid.png';
const MainBody = () => {
  return (
    <>
      <AuctionRegister />
      {/* <img src={afterBid} width="100%" alt="no" /> */}
    </>
  );
};

export default MainBody;
