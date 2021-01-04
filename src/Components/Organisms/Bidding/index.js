import { Border, Button, Input, Text } from 'Components/Atoms';
import { ImageBox, List } from 'Components/Molecules';

import { AiOutlineClose } from 'react-icons/ai';
import Date from 'Utils/date-utils';
import React from 'react';
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
    await fetch(
      `http://192.168.0.120:8080/user/${userInfo.id}/auction/${data.url}/bid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AUTH_TOKEN: userInfo.accessToken
        },
        body: JSON.stringify({
          bidPrice: value.bidPrice,
          auctionId: data.id
        })
      }
    );
    closeModal();
  };

  return (
    <List>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}
      >
        <AiOutlineClose size={30} onClick={closeModal} />
      </div>
      <Text>상품명</Text>
      <Input readOnly name="name" value={data.name} />
      <Text>경매 마감일</Text>
      <Input readOnly name="closingTime" value={data.closingTime} />

      <Border height="8px" />

      <Text>현재가</Text>
      <Input
        readOnly
        name="startingPrice"
        value={`${comma(data.currentPrice)} 원`}
      />
      <Text>경매 참여일</Text>
      <Input
        readOnly
        name="productPrice"
        value={new Date().format('yyyy-MM-dd hh:mm:ss')}
      />
      <Text>입찰 금액</Text>
      <Input
        name="bidPrice"
        placeholder={'시작가를 입력해주세요.'}
        onChange={onChange}
      />
      <Text>입찰자</Text>
      <Input name="productPrice" placeholder={'시작가를 입력해주세요.'} />
      <Text>연락처</Text>
      <Input name="productPrice" placeholder={'시작가를 입력해주세요.'} />
      <Button onClick={biddingHandler} primary common>
        입찰하기
      </Button>
    </List>
  );
};

export default Bidding;
