import { Border, Button, Input, Text } from 'Components/Atoms';
import React, { useState } from 'react';

import { List } from 'Components/Molecules';
import { auctionApi } from 'Apis/auctionApi';
import bidComplete from 'assets/img/bidComplete.png';
import { comma } from 'Utils/comma-utils';
import styled from 'styled-components';
import { useInput } from 'Hooks/useInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Bidding = ({ data, userInfo, isOpen }) => {
  const [value, setValue] = useInput({});
  const [productPrice, setProductPrice] = useState('');
  const [complete, setIsComplete] = useState(!isOpen);

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

    const res = await auctionApi.registerBid(userInfo.id, data.url, {
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

    // const err = await res.json();
    // if (err.message == 'Continuous bidding is not possible.') {
    //   alert('다음 입찰자가 생기기 전에 두번 연속 입찰 하실수 없습니다. ');
    //   return;
    // }
    setIsComplete(true);
  };

  return !complete ? (
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

      <Button onClick={biddingHandler} primary common>
        입찰하기
      </Button>
    </List>
  ) : (
    <Container
      style={{
        height: '100%'
      }}
    >
      {/* <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: 10,
          fontSize: 25,
          color: '#6E44FF'
        }}
      >
        ₊·*◟(˶╹̆ꇴ╹̆˵)◜‧*･
      </div> */}
      <img src={bidComplete} style={{ width: '40%' }}></img>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10,
          fontSize: 20
        }}
      >
        입찰 되었습니다.
      </div>
    </Container>
  );
};

export default Bidding;
