import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
  min-height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TransactionMethodWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const TransactionMethod = ({ method }) => {
  return <TransactionMethodWrapper>{method}</TransactionMethodWrapper>;
};

const DetailText = styled.div`
  font-size: 20px;
`;

const ProductDetail = props => {
  return (
    <Wrapper>
      <TransactionMethod method={props.tradingMethod} />
      <DetailText>{props.productDetail}</DetailText>
    </Wrapper>
  );
};

export default ProductDetail;
