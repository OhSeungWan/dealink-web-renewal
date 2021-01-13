import { Border, Button, Input, Text } from 'Components/Atoms';
import React, { useState } from 'react';

import { List } from 'Components/Molecules';
import { auctionApi } from 'Apis/auctionApi';
import { comma } from 'Utils/comma-utils';
import { useInput } from 'Hooks/useInput';

const Bidding = ({ data, userInfo, closeModal }) => {
  const [value, setValue] = useInput({});
  const [productPrice, setProductPrice] = useState('');
  console.log(value);

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const price = value;
    const formattingPrice = price.replace(/[^0-9]/g, '');
    setValue(name, formattingPrice);
    setProductPrice(`${comma(formattingPrice)}`);
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          borderRadius: 5,
          border: `1px solid #EAEAEA`,
          marginBottom: 20
        }}
      >
        <Input
          readOnly
          style={{ textAlign: 'center', flex: 6, border: 'none', margin: 0 }}
          value={`${comma(data.currentPrice)}`}
          name="startingPrice"
        ></Input>
        <div
          style={{
            flex: 1,
            textAlign: 'center'
          }}
        >
          원
        </div>
      </div>

      <Text>입찰 금액</Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          borderRadius: 5,
          border: `1px solid #6E44FF`,
          marginBottom: 40
        }}
      >
        <Input
          style={{ textAlign: 'center', flex: 6, border: 'none', margin: 0 }}
          value={comma(productPrice)}
          name="bidPrice"
          placeholder={`${comma(data.currentPrice)}원 부터 입찰 가능합니다`}
          onChange={onChange}
        ></Input>
        <div
          style={{
            flex: 1,
            textAlign: 'center'
          }}
        >
          원
        </div>
      </div>

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
