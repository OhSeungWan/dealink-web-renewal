import { Border, CheckButton, Text } from 'Components/Atoms';
import React, { useState } from 'react';

import { List } from 'Components/Molecules';
import styled from 'styled-components';

const AuctionOptions = props => {
  // const onChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   props.onChange(name, value);
  // };

  const [tradeMethod, setTradeMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const CheckTradeHandler = e => {
    e.preventDefault();
    const name = e.target.getAttribute('name');
    setTradeMethod(name);
  };

  const CheckPaymentHandler = e => {
    e.preventDefault();
    const name = e.target.getAttribute('name');
    setPaymentMethod(name);
  };

  return (
    <List alignCenter>
      <Border height="8px" />
      <div
        style={{
          display: 'flex',
          width: '90%',
          alignItems: 'center'
        }}
      >
        <div>거래 방식</div>
        <div style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
          다중 선택 가능
        </div>
      </div>

      <List spaceAround direction="row">
        <CheckButton
          name="delivery"
          text="택배거래"
          onClick={CheckTradeHandler}
          checked={tradeMethod}
          overlapping={true}
        />
        <CheckButton
          name="direct"
          text="직거래"
          onClick={CheckTradeHandler}
          checked={tradeMethod}
          overlapping={true}
        />
      </List>

      {/* <div style={{ display: 'flex', width: '90%', alignItems: 'center' }}>
        <div>배송 방식</div>
        <div style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
          중복 선택 불가
        </div>
      </div>
      <List spaceAround direction="row">
        <CheckButton
          name="deposit"
          text="무통장입금"
          onClick={CheckPaymentHandler}
          checked={paymentMethod}
        />
        <CheckButton
          name="card"
          text="카드결제"
          onClick={CheckPaymentHandler}
          checked={paymentMethod}
        />
      </List> */}
      <Border height="8px" />
    </List>
  );
};

export default AuctionOptions;
