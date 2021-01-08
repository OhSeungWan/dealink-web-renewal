import { BidHistory, ImageBox, List } from 'Components/Molecules';
import { Border, Input, Text } from 'Components/Atoms';
import React, { useState } from 'react';

import { comma } from 'Utils/comma-utils';
import styled from 'styled-components';

const TextArea = styled.textarea.attrs(props => ({ rows: 5, cols: 33 }))`
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin: 15px 0px 15px 0px;
  width: 80%;
  text-align: center;
`;

const ProductInfo = props => {
  const [productPrice, setProductPrice] = useState('');

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    props.onChange(name, value);

    if (name == 'productPrice') {
      const price = value;
      console.log(value);
      price.replaceAll(',', '');
      const formattingPrice = price.replace(/[^0-9]/g, '');
      console.log(formattingPrice.replace(/[^0-9]/g, ''));
      setProductPrice(`${comma(formattingPrice)}`);
    }
  };

  return !props.type ? (
    <List alignCenter={true}>
      <Text>상품사진</Text>
      <ImageBox type="upload" onChange={props.onChange} />
      <Text>상품명</Text>
      <Input
        name="productTitle"
        placeholder={'상품명을 입력해주세요'}
        onChange={onChange}
      />
      <Text>상품설명</Text>
      <TextArea
        name="description"
        placeholder={'상품설명을 입력해주세요'}
        onChange={onChange}
      />
      <Text>상품가격</Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          borderRadius: 5,
          border: `1px solid #eaeaea`
        }}
      >
        <Input
          style={{ textAlign: 'center', flex: 6, border: 'none', margin: 0 }}
          value={comma(productPrice)}
          name="productPrice"
          placeholder={'시작가를 입력해주세요.'}
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

      <Text>카카오 오픈채팅 URL</Text>
      <Input
        name="kakaoUrl"
        placeholder={'추후 낙찰자와 대화하기 위한 채팅방 입니다.'}
        onChange={onChange}
      />
      <Border height="8px" />
    </List>
  ) : (
    <ProductInfoForBuyer {...props} />
  );
};

const ProductTitle = styled.div`
  padding: 10px;
  font-weight: 700;
  font-size: 20px;
`;

const ProductPrice = styled.div`
  font-weight: 700;
  color: ${props => (props.current ? 'black' : 'gray')};
  font-size: ${props => (props.current ? '25px' : '16px')};
  flex: 8;
`;

const ProductText = styled.div`
  flex: 3;
  color: ${props => (props.current ? 'black' : 'gray')};
`;

const ProductWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProductInfoForBuyer = props => {
  return (
    <List>
      {/* <ImageBox url={props.imageUrls[0]} /> */}
      <Border height="8px" />
      <ProductTitle>{props.name}</ProductTitle>
      <Border height="8px" />
      <ProductWrapper>
        <ProductText current>현재가</ProductText>
        <ProductPrice current>{comma(props.currentPrice)} 원</ProductPrice>
      </ProductWrapper>
      <ProductWrapper>
        <ProductText>시작가</ProductText>
        <ProductPrice>{comma(props.startingPrice)} 원</ProductPrice>
      </ProductWrapper>
      <BidHistory bidHistoryCount={props.bidHistoryCount} link={props.url} />
      {/* <ProductWrapper>
        <ProductText>내입찰가</ProductText>
        <ProductPrice>{comma(props.currentPrice)} 원</ProductPrice>
      </ProductWrapper> */}
      <Border height="8px" />
    </List>
  );
};

export default ProductInfo;
