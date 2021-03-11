import { AuctionOptions, ProductInfo } from 'Components/Organisms';

import React from 'react';
import styled from 'styled-components';
// import { List, Timer } from 'Components/Molecules';


const AuctionRegisterInputForm = props => {
  const { value, onChange } = props;
  return (
    <>
      <ProductInfo value={value} onChange={onChange} />
      {/* <List alignCenter={true}> */}
      {/* <TimerTitleWrapper> */}
      {/* <TimerText>경매 진행기간</TimerText>
          <TimerText style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
            경매 진행 시간을 설정해 주세요.
          </TimerText> */}
      {/* </TimerTitleWrapper> */}
      {/* <Timer isSet={false} auctionInput={value} onChange={onChange} /> */}
      {/* </List> */}
      <AuctionOptions value={value} onChange={onChange} />
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
