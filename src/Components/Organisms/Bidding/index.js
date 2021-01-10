import { Border, Button, Input, Text } from 'Components/Atoms';

import { AiOutlineClose } from 'react-icons/ai';
import Date from 'Utils/date-utils';
import { List } from 'Components/Molecules';
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
    console.log(value.bidPrice);
    console.log(data.currentPrice);
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
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          position: 'sticky',
          top: 0
        }}
      >
        <AiOutlineClose size={30} onClick={closeModal} />
      </div>

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
        placeholder={'시작가를 입력해주세요.'}
        onChange={onChange}
        style={{ border: '1px solid #6E44FF', marginBottom: 40 }}
      />
      <Button
        onClick={biddingHandler}
        primary
        common
        style={{ position: 'fixed', bottom: 5 }}
      >
        입찰하기
      </Button>
    </List>
  );
};

export default Bidding;
