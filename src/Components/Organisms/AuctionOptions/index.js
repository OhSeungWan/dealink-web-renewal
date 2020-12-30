import { Border, CheckButton, Input, Text } from 'Components/Atoms';
import { ImageBox, List, Timer } from 'Components/Molecules';

import React from 'react';
import styled from 'styled-components';

const CheckList = styled(List).attrs(props => ({
  direction: 'row'
}))``;

const AuctionOptions = props => {
  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  return (
    <List>
      <Border height="8px" />
      <Text>배송 방식</Text>
      <CheckList spaceAround>
        <CheckButton text="택배거래" />
        <CheckButton text="직거래" />
      </CheckList>

      <Text>결제 방식</Text>
      <CheckList spaceAround>
        <CheckButton text="무통장입금" />
        <CheckButton text="딜링크 카드결제" />
      </CheckList>
      <Border height="8px" />
    </List>
  );
};

export default AuctionOptions;
