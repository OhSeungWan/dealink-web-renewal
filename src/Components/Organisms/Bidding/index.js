import { Border, Button, Input, Text } from 'Components/Atoms';
import { Redirect, Route, Switch } from 'react-router-dom';

import { List } from 'Components/Molecules';
import { PrivateContents } from 'Routers/MainRouter';
import React from 'react';
import { auctionApi } from 'Apis/auctionApi';
import { comma } from 'Utils/comma-utils';
import { useInput } from 'Hooks/useInput';

const Bidding = ({ data, userInfo, closeModal }) => {
  const [value, setValue] = useInput({});

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue(name, value);
  };

  const biddingHandler = async () => {
    if (parseInt(value.bidPrice) <= parseInt(data.currentPrice)) {
      alert('입찰가는 현재가보다 작거나 같을수 없습니다.');
      return;
    }

    await auctionApi.registerBid(userInfo.id, data.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTH_TOKEN: userInfo.accessToken
      },
      body: JSON.stringify({
        bidPrice: value.bidPrice,
        auctionId: data.id
      })
    });
    closeModal();
  };

  return (
    <List alignCenter={true}>
      <Text>경매 마감일</Text>
      <Input readOnly name="closingTime" value={data.closingTime} />

      <Border height="8px" />

      <Text>현재가</Text>
      <Input
        readOnly
        name="startingPrice"
        value={`${comma(data.currentPrice)} 원`}
      />

      <Text>입찰 금액</Text>
      <Input
        name="bidPrice"
        placeholder={'입찰가를 입력해주세요.'}
        onChange={onChange}
        style={{ border: '1px solid #6E44FF', marginBottom: 40 }}
      />
      <Button
        onClick={biddingHandler}
        primary
        common
        style={{ position: 'sticky', bottom: 5 }}
      >
        입찰하기
      </Button>
    </List>
  );
};

export default Bidding;
