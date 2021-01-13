import { BidHistory, ImageBox, List } from 'Components/Molecules';
import { Border, Input, Text } from 'Components/Atoms';
import React, { useState } from 'react';

import { comma } from 'Utils/comma-utils';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TextArea = styled.textarea.attrs(props => ({ rows: 5, cols: 33 }))`
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin: 15px 0px 15px 0px;
  width: 80%;
  text-align: center;
`;

const ProductInfo = props => {
  const [productPrice, setProductPrice] = useState(props.templink ? '' : '');
  const history = useHistory();
  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    props.onChange(name, value);

    if (name == 'productPrice') {
      const price = value;
      const formattingPrice = price.replace(/[^0-9]/g, '');
      setProductPrice(`${comma(formattingPrice)}`);
    }
    props.valueValidate();
  };

  const userInfo = useSelector(state => state.user);
  const confirmLogin = () => {
    if (!userInfo.accessToken) {
      alert('로그인 후 상품 등록이 가능합니다.');
      history.push('/SignIn');
    }
  };
  return !props.type ? (
    <List alignCenter={true}>
      <Text>상품사진</Text>
      <ImageBox type="upload" onChange={props.onChange} />
      <Text>상품명</Text>
      <Input
        value={props.value.name}
        name="productTitle"
        placeholder={'상품명을 입력해주세요'}
        onChange={onChange}
        onClick={confirmLogin}
      />
      <Text>상품설명</Text>
      <TextArea
        value={props.value.description}
        name="description"
        placeholder={'상품설명을 입력해주세요'}
        onChange={onChange}
        onClick={confirmLogin}
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
          onClick={confirmLogin}
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
        value={props.value.chatUrl}
        name="kakaoUrl"
        placeholder={'추후 낙찰자와 대화하기 위한 채팅방 입니다.'}
        onChange={onChange}
        onClick={confirmLogin}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'center'
        }}
      >
        <div style={{ color: '#6E44FF', paddingTop: 10, fontSize: 12 }}>
          • 채팅방 명은 상품명으로 변경해주세요.
        </div>
        <div style={{ color: '#6E44FF', paddingTop: 10, fontSize: 12 }}>
          • 검색 허용은 꺼주세요.
        </div>
        <div style={{ paddingTop: 20, fontSize: 12 }}>
          <MakeKaKao
            target="_blank"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            href="https://cs.kakao.com/helps?articleId=1073184402&service=8&category=105&device=1&locale=ko"
          >
            <div>판매자용 카카오 오픈채팅방 만드는 방법</div>
            <div>▶</div>
          </MakeKaKao>
          <hr
            style={{
              marginTop: 15,
              border: 'solid 1px #EAEAEA'
            }}
          />
        </div>
      </div>
      <Border height="8px" />
    </List>
  ) : (
    <ProductInfoForBuyer {...props} />
  );
};

const MakeKaKao = styled.a`
  :link {
    color: black;
    text-decoration: none;
  }
  :visited {
    color: black;
    text-decoration: none;
  }
  :hover {
    color: black;
    text-decoration: underline;
  }
`;

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
