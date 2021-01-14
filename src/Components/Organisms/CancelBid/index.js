import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CancelBid = () => {
  return <Container>입찰 취소</Container>;
};

export default CancelBid;
