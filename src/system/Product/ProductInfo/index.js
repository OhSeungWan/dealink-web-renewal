import { Border } from 'Components/Atoms';
import ProductBidHistoryOpenBtn from 'system/Product/ProductInfo/ProductBidHistoryOpenBtn';
import ProductBottomBtn from 'system/Product/ProductInfo/ProductBottomBtn';
import ProductComment from 'system/Product/ProductInfo/ProductComment';
import ProductDetail from 'system/Product/ProductInfo/ProductDetail';
import ProductImg from 'system/Product/ProductInfo/ProductImg';
import ProductPrice from 'system/Product/ProductInfo/ProductPrice';
import ProductProfile from 'system/Product/ProductInfo/ProductProfile';
import React from 'react';
import { Share } from 'Components/Molecules';
import styled from 'styled-components';

const ProductInfo = ({ auction, type }) => {
  console.log(auction);
  return (
    <ProductInfoWrapper>
      <ProductImg auction={auction} />
      <ProductProfile auction={auction} />
      <Border height="8px" />
      <div className="productTitle">{auction.name}</div>
      <ProductPrice auction={auction} />
      <ProductBidHistoryOpenBtn auction={auction} />
      <Border height="8px" />
      <Share
        url={`https://www.dealink.co.kr/detail/seller/0/${auction.url}`}
        data={auction} //클립보드 복사 url
      />
      <ProductDetail auction={auction} />
      <Border height="8px" />
      <ProductComment auction={auction} />
      <ProductBottomBtn auction={auction} type={type} />
    </ProductInfoWrapper>
  );
};

const ProductInfoWrapper = styled.div`
  width: 100%;
  .productTitle {
    padding: 0px 15px;
    font-size: 18px;
  }
`;

export default ProductInfo;
