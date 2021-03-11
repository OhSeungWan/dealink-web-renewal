import React from 'react';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';

const ProductPrice = ({ auction }) => {
  return (
    <ProductPriceWrppper>
      <div className="PriceWrapper">
        <div className="priceType current">가격</div>
        <div className="price current">{comma(auction.startingPrice)} 원</div>
        {/* {userInfo.isLogin && auction.userType == 'SELLER' && (
      <button onClick={closeAuction} className="trade">
        현재가로 경매 마감하기
      </button>
    )} */}
      </div>

      {/* <div className="PriceWrapper">
        <div className="priceType">시작가</div>
        <div className="price">{comma(auction.startingPrice)} 원</div>
      </div> */}
    </ProductPriceWrppper>
  );
};

const ProductPriceWrppper = styled.div`
  padding: 15px;

  .PriceWrapper {
    display: flex;
    justify-content: space-between;
    width: 50%;
    align-items: center;
  }

  .priceType {
    font-size: 12px;
    color: #868686;
    &.current {
      color: black;
    }
  }

  .price {
    font-size: 22px;
    color: #868686;
    &.current {
      color: black;
      font-size: 28px;
    }
  }
`;

export default ProductPrice;
