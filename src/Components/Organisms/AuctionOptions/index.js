import { Border, CheckButton, Text } from 'Components/Atoms';

import { List } from 'Components/Molecules';
import React from 'react';

const AuctionOptions = props => {
  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  return (
    <List alignCenter>
      <Border height="8px" />
      <Text>배송 방식</Text>
      <List spaceAround direction="row">
        <CheckButton text="택배거래" />
        <CheckButton text="직거래" />
      </List>

      <Text>결제 방식</Text>
      <List spaceAround direction="row">
        <CheckButton text="무통장입금" />
        <CheckButton text="카드결제" />
      </List>
      <Border height="8px" />
    </List>
  );
};

export default AuctionOptions;
