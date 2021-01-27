import { AuctionOptions, ProductInfo } from 'Components/Organisms';
import { List, Share, Timer } from 'Components/Molecules';

import React from 'react';
import styled from 'styled-components';

const AuctionRegisterInputForm = props => {
  return (
    <>
      <ProductInfo value={props.value} onChange={props.onChange} />
      <List alignCenter={true}>
        <TimerTitleWrapper>
          <TimerText>경매 진행기간</TimerText>
          <TimerText style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
            경매 진행 시간을 설정해 주세요.
          </TimerText>
        </TimerTitleWrapper>
        <Timer isSet={false} value={props.value} onChange={props.onChange} />
      </List>
      <AuctionOptions value={props.value} onChange={props.onChange} />
    </>
  );
};

const TimerTitleWrapper = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  margin-bottom: 10px;
`;

const TimerText = styled.div`
  font-size: 18px;
`;
export default AuctionRegisterInputForm;
