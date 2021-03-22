import { Border } from 'Components/Atoms';
import ProductBidHistoryOpenBtn from 'domain/Product/ProductInfo/ProductBidHistoryOpenBtn';
import ProductBottomBtn from 'domain/Product/ProductInfo/ProductBottomBtn';
import ProductComment from 'domain/Product/ProductInfo/ProductComment';
import ProductDetail from 'domain/Product/ProductInfo/ProductDetail';
import ProductImg from 'domain/Product/ProductInfo/ProductImg';
import ProductPrice from 'domain/Product/ProductInfo/ProductPrice';
import ProductProfile from 'domain/Product/ProductInfo/ProductProfile';
import React from 'react';
import { Share } from 'Components/Molecules';
import styled from 'styled-components';

const ProductInfo = ({ auction, type, bidData }) => {
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
        url={`https://aca.dealink.co.kr/detail/seller/0/${auction.url}`}
        data={auction} //클립보드 복사 url
      />
      <ProductDetail auction={auction} />
      <Border height="8px" />
      <ProductComment auction={auction} />
      <ProductBottomBtn auction={auction} type={type} bidData={bidData} />
    </ProductInfoWrapper>
  );
};

const ProductInfoWrapper = styled.div`
  width: 100%;
  margin-bottom: 80px;
  .productTitle {
    padding: 0px 15px;
    font-size: 18px;
  }
`;

export default ProductInfo;
