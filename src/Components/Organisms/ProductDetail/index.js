import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
  return (
    <TransactionMethodWrapper>
      <TransactionMethodItem selected>✓{method}</TransactionMethodItem>
      <TransactionMethodItem>✓택배거래</TransactionMethodItem>
    </TransactionMethodWrapper>
  );
};
const TransactionMethodItem = styled.div`
  padding: 10px;
  color: ${props => (props.selected ? 'black' : 'gray')};
`;
const DetailText = styled.div`
  padding: 10px;
  font-size: 20px;
`;

const ProductDetail = props => {
  return (
    <Wrapper>
      <TransactionMethod method={props.tradingMethod} />
      <DetailText>{props.description}</DetailText>
    </Wrapper>
  );
};

export default ProductDetail;
