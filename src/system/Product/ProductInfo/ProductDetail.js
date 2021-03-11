import React from 'react';
import styled from 'styled-components';

const ProductDetail = ({ auction }) => {
  return (
    <ProductDetailWrapper>
      <TransactionMethod method={auction.tradingMethod} />
      <div style={{ padding: 15 }}>
        <div className="description">{auction.description}</div>
      </div>
    </ProductDetailWrapper>
  );
};

const TransactionMethod = ({ method }) => {
  console.log(method);
  return (
    <div className="TransactionMethod">
      <div className="title">거래방식</div>
      <div className="method">✓직거래</div>
      <div className="method">✓택배거래</div>
    </div>
  );
};

const ProductDetailWrapper = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .description {
    font-size: 16px;
    white-space: pre-line;
  }

  .TransactionMethod {
    padding: 15px;
    display: flex;

    .title {
      font-size: 14px;
    }

    .method {
      border: solid 1px ${props => (props.selected ? '#6e44ff' : '#A09FA7')};
      border-radius: 5px;
      padding: 0px 10px;
      margin-left: 10px;
      color: ${props => (props.selected ? '#6e44ff' : '#A09FA7')};
    }

    .method + .method {
      margin-left: 15px;
    }
  }
`;

export default ProductDetail;
