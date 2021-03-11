import {
  openModal,
  useAuctionDetailDispatch
} from 'Pages/ProductDetail/AuctionDetailContext';

import { IoIosArrowDroprightCircle } from 'react-icons/io';
import React from 'react';
import styled from 'styled-components';

const ProductBidHistoryOpenBtn = ({ auction }) => {
  const dispatch = useAuctionDetailDispatch();

  function handleClick() {
    openModal(dispatch, 'bidHistory');
  }

  return (
    <ProductBidHistoryOpenBtnWrapper onClick={handleClick}>
      <div className="wrapper">
        <div className="title">누적 관심수</div>
        <div className="count">{auction.bidHistoryCount}개</div>
      </div>
      <div className="wrapper">
        <div className="confirm">관심 확인</div>
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
