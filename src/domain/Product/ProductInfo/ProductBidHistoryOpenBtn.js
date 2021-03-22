import React, { useEffect } from 'react';
import {
  closeModal,
  openModal,
  useAuctionDetailDispatch
} from 'Pages/ProductDetail/AuctionDetailContext';

import { IoIosArrowDroprightCircle } from 'react-icons/io';
import styled from 'styled-components';

const ProductBidHistoryOpenBtn = ({ auction }) => {
  const dispatch = useAuctionDetailDispatch();

  function handleClick() {
    openModal(dispatch, 'bidHistory');
  }
  useEffect(() => {
    return () => closeModal(dispatch);
  }, []);

  return (
    <ProductBidHistoryOpenBtnWrapper onClick={handleClick}>
      <div className="wrapper">
        <div className="title">찜 </div>
        <div className="count">{auction.bidHistoryCount}명</div>
      </div>
      <div className="wrapper">
        <div className="confirm">찜한사람 확인하기</div>
        <IoIosArrowDroprightCircle className="icon" size={25} />
      </div>
    </ProductBidHistoryOpenBtnWrapper>
  );
};

const ProductBidHistoryOpenBtnWrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f7;

  .wrapper {
    display: flex;
  }

  .count {
    margin-left: 15px;
    color: #ff2f2f;
  }
  .icon {
    margin-left: 15px;
  }
`;
export default ProductBidHistoryOpenBtn;
