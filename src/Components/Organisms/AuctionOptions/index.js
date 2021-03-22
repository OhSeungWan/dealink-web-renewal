import { Border, CheckButton } from 'Components/Atoms';
import React, { useState } from 'react';

import { List } from 'Components/Molecules';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuctionOptions = props => {
  // const onChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   props.onChange(name, value);
  // };
  const history = useHistory();
  const [tradeMethod, setTradeMethod] = useState('');
  // const [paymentMethod, setPaymentMethod] = useState('');
  const userInfo = useSelector(state => state.user);
  const CheckTradeHandler = e => {
    if (!userInfo.isLogin) {
      alert('로그인 후 상품 등록이 가능합니다.');
      history.push('/SignIn');
      return;
    }
    e.preventDefault();
    const name = e.target.getAttribute('name');
    setTradeMethod(name);
    if (name === 'direct') {
    } else {
    }
  };

  // const CheckPaymentHandler = e => {
  //   e.preventDefault();
  //   const name = e.target.getAttribute('name');
  //   // setPaymentMethod(name);
  // };

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
        <div style={{ fontSize: 18 }}>거래 방식</div>
        <div style={{ color: '#A09FA7', marginLeft: 10, fontSize: 13 }}>
          복수 선택 가능
        </div>
      </div>

      <List spaceAround direction="row">
        <CheckButton
          name="delivery"
          text="✓택배거래"
          onClick={CheckTradeHandler}
          checked={tradeMethod}
          overlapping={true}
        />
        <CheckButton
          name="direct"
          text="✓직거래"
          onClick={CheckTradeHandler}
          checked={tradeMethod}
          overlapping={true}
        />
      </List>

      <Border height="8px" />
    </List>
  );
};

export default AuctionOptions;
