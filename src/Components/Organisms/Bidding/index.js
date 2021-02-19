import { Button, Input, Text } from 'Components/Atoms';
import React, { useState } from 'react';

import { List } from 'Components/Molecules';
import { auctionApi } from 'Apis/auctionApi';
import beforeBid from 'assets/img/beforeBid.png';
import bidComplete from 'assets/img/bidComplete.png';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';
import { useInput } from 'Hooks/useInput';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Bidding = ({ data, isOpen }) => {
  const [value, setValue] = useInput({});
  const [productPrice, setProductPrice] = useState('');
  const [complete, setIsComplete] = useState(!isOpen);
  const userInfo = useSelector(state => state.user);

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const price = value;
    const formattingPrice = price.replace(/[^0-9]/g, '');
    setValue(name, formattingPrice);
    if (formattingPrice > 100) {
      setProductPrice(`${comma(Math.ceil(formattingPrice / 100) * 100)}`);
    } else {
      setProductPrice(`${comma(formattingPrice)}`);
    }
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
      <div style={{ fontSize: 12, padding: 5, textAlign: 'left' }}>
        입찰 금액은 100원 단위로 입찰 가능합니다
      </div>
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

      <div
        style={{
          width: '100%',
          backgroundColor: '#F5F5F7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 10px',
          marginBottom: '40px',
          flexDirection: 'column'
        }}
      >
        <div style={{ width: '90%', fontSize: 14 }}>
          {`- 입찰 및 낙찰 시 카카오톡 알림을 발송해 드립니다. \n`}
        </div>
        <div style={{ width: '90%', fontSize: 14 }}>
          {`- 낙찰 후 판매자의 오픈채팅방 링크를 발송해 드립니다 \n`}
        </div>
      </div>

      <Button
        onClick={biddingHandler}
        primary
        common
        style={{ position: 'relative' }}
      >
        <img
          src={beforeBid}
          style={{
            position: 'absolute',
            top: -37,
            left: '25%',
            width: '100%',
            maxWidth: 200
          }}
          alt="no"
        />
        입찰 GO!
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
      <img src={bidComplete} style={{ width: '40%' }} alt="no"></img>
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
