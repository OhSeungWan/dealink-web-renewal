import { BidHistory, ImageBox, List } from 'Components/Molecules';
import { Border, Button, Input, ScreenWrapper, Text } from 'Components/Atoms';
import React, { useEffect, useState } from 'react';

import { Loading } from 'Components/Organisms/Modal';
import { Modal } from 'Components/Organisms';
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
  font-size: 16px;
`;

const ProductInfo = props => {
  const [productPrice, setProductPrice] = useState(
    props.value ? props.value.productPrice : ''
  );
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
        value={props.value.productTitle}
        name="productTitle"
        placeholder={'상품명을 입력해주세요'}
        onChange={onChange}
        // onClick={confirmLogin}
      />
      <Text>상품설명</Text>
      <TextArea
        value={props.value.description}
        name="description"
        placeholder={'상품설명을 입력해주세요'}
        onChange={onChange}
        // onClick={confirmLogin}
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
          type="tel"
          style={{
            textAlign: 'center',
            flex: 6,
            border: 'none',
            margin: 0,
            paddingLeft: 50
          }}
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
        value={props.value.kakaoUrl}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ProductInfoForBuyer = props => {
  const userInfo = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [bidData, setBidData] = useState({});
  const [cancleComplete, setCancelComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = async () => {
    const res = await fetch(
      `https://rest.dealink.co.kr/user/${userInfo.id}/auction/${props.url}/bid/cancel-request`,
      {
        headers: {
          AUTH_TOKEN: userInfo.accessToken
        }
      }
    );
    const data = await res.json();
    setBidData(data);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCancelComplete(false);
  };

  const cancelBid = async () => {
    setLoading(true);
    setCancelComplete(false);
    await fetch(
      `https://rest.dealink.co.kr/user/${userInfo.id}/auction/${props.url}/bid/cancel`,
      {
        method: 'GET',
        headers: {
          AUTH_TOKEN: userInfo.accessToken
        }
      }
    );
    setLoading(false);
    setCancelComplete(true);
  };
  return (
    <List>
      {/* <ImageBox url={props.imageUrls[0]} /> */}
      <Border height="8px" />
      <ProductTitle>{props.name}</ProductTitle>
      <Border height="8px" />
      <ProductWrapper>
        <ProductText current>현재가</ProductText>
        <ProductPrice current>{comma(props.currentPrice)} 원</ProductPrice>
        {true && props.auctionStatus != 'AUCTION_COMPLETED' && (
          <button
            onClick={openModal}
            style={{
              border: '1px solid #6E44FF',
              color: '#6E44FF',
              backgroundColor: 'white',
              borderRadius: 5
            }}
          >
            입찰 취소 요청
          </button>
        )}
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
      <ScreenWrapper>
        <Modal
          isOpen={isOpen}
          title={'입찰 취소 '}
          height={80}
          closeModal={closeModal}
        >
          {!loading ? (
            cancleComplete ? (
              <Container>
                <div>입찰 취소 완료</div>
              </Container>
            ) : (
              <Container>
                {bidData.message != 'Bid history not exists' && (
                  <>
                    <div style={{ fontSize: 20, width: '90%', marginTop: 16 }}>
                      경매마감일
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        width: '90%',
                        border: '1px solid #EAEAEA',
                        borderRadius: 5,
                        marginTop: 16
                      }}
                    >
                      <div style={{ padding: 16 }}>{props.closingTime}</div>
                    </div>
                    <div style={{ fontSize: 20, width: '90%', marginTop: 16 }}>
                      입찰금액
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        width: '90%',
                        border: '1px solid #EAEAEA',
                        borderRadius: 5,
                        marginTop: 16
                      }}
                    >
                      <div style={{ padding: 16 }}>{bidData.bidPrice}</div>
                    </div>
                    <div
                      style={{
                        backgroundColor: '#F5F5F7',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        paddingTop: 10,
                        paddingBottom: 10
                      }}
                    >
                      <div
                        style={{
                          width: '90%',
                          color: '#605F65',
                          fontSize: 14,
                          display: 'flex'
                        }}
                      >
                        <div>•</div> 입찰 취소 시 입찰 내역에서 삭제됩니다. 한
                        번 취소한 입찰은 복구할 수 없으며, 재 입찰하셔야 합니다.
                      </div>
                      <div
                        style={{
                          width: '90%',
                          color: '#605F65',
                          fontSize: 14,
                          display: 'flex',
                          marginTop: 10
                        }}
                      >
                        <div>•</div> 상품 입찰을 반복적으로 취소할 경우, 추후
                        서비스 이용이 제한될 수 있습니다.
                      </div>
                    </div>

                    <Button
                      style={{
                        width: '90%',
                        padding: '13px 13px',
                        border: 'none',
                        fontSize: 16,
                        marginTop: 20
                      }}
                      onClick={cancelBid}
                    >
                      입찰 취소 요청
                    </Button>
                  </>
                )}
                {bidData.message == 'Bid history not exists' && (
                  <div>회원님의 입찰 기록이 존재하지 않습니다.</div>
                )}
              </Container>
            )
          ) : (
            <ScreenWrapper>
              <Loading isOpen={true} />
            </ScreenWrapper>
          )}
        </Modal>
      </ScreenWrapper>
    </List>
  );
};

export default ProductInfo;
