import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TransactionMethodWrapper = styled.div`
  padding: 15px;
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
  padding: 15px;
  color: ${props => (props.selected ? 'black' : 'gray')};
`;
const DetailText = styled.div`
  width: 100%;
  font-size: 20px;
`;

const ProductDetail = props => {
  return (
    <Wrapper>
      <TransactionMethod method={props.tradingMethod} />
      <div style={{ padding: 15 }}>
        <DetailText style={{ wordBreak: 'break-all' }}>
          {props.description}
        </DetailText>
      </div>
    </Wrapper>
  );
};

export default ProductDetail;
