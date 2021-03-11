import { BidHistory, ImageBox, List } from 'Components/Molecules';
import { Border, Button, Input, ScreenWrapper, Text } from 'Components/Atoms';
import React, { useEffect, useState } from 'react';

import { HiUserCircle } from 'react-icons/hi';
import { Loading } from 'Components/Organisms/Modal';
import { Modal } from 'Components/Organisms';
import { REQUEST_URL } from 'Constants/server';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductInfo = props => {
  const history = useHistory();

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'productPrice') {
      props.onChange(name, value.replace(/[^0-9]/g, ''));
    } else {
      props.onChange(name, value);
    }
  };

  const userInfo = useSelector(state => state.user);
  const confirmLogin = () => {
    if (!userInfo.isLogin) {
      alert('로그인 후 상품 등록이 가능합니다.');
      history.push('/SignIn');
    }
  };
  return !props.type ? (
    <StyledList className="productinfo" alignCenter={true}>
      <Text className="name">상품사진</Text>
      <ImageBox
        type="upload"
        onChange={props.onChange}
        imglist={props.value.imageList}
        auctionStatus={'PROCEEDING'}
      />
      <Text className="name">상품명</Text>
      <Input
        className="input"
        value={props.value.productTitle}
        name="productTitle"
        id="productTitle"
        placeholder={'상품명을 입력해주세요.'}
        onChange={onChange}
        onClick={confirmLogin}
      />
      <Text className="name">상품설명</Text>
      <TextArea
        value={props.value.description}
        name="description"
        id="description"
        placeholder={'상품 내용 및 거래 희망지역(시/구)을 적어주세요.'}
        onChange={onChange}
        onClick={confirmLogin}
      />
      <Text className="name">상품가격</Text>
      {/* <div className="explain">
        딜링크는 무료나눔 플렛폼으로 최초등록 가격은 100원입니다.
      </div>
      <div className="explain">
        추후 다른사람의 입찰을 통해 가격이 올라갈수 있습니다.
      </div> */}
      <div className="price">
        <Input
          type="tel"
          value={comma(props.value.productPrice)}
          // value={comma(100)}
          name="productPrice"
          id="productPrice"
          placeholder={'상품의 가격을 입력해주세요.'}
          onChange={onChange}
          onClick={confirmLogin}
        />
        <div className="suffix">원</div>
      </div>
      {/* <Border height="8px" /> */}
    </StyledList>
  ) : (
    <ProductInfoForBuyer {...props} />
  );
};

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  .name {
    font-size: 18px;
    margin-bottom: 15px;
    margin-top: 30px;
    padding: 0px;
  }
  .explain {
    width: 90%;
    font-size: 14px;
    text-align: left;
    color: #6e44ff;
  }
  .input {
    text-align: left;
  }

  .price {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;

    input {
      text-align: left;
      flex: 6;
      border-radius: 5px;
      border: 1px solid #eaeaea;
    }

    .suffix {
      flex: 1;
      text-align: center;
      font-size: 28px;
    }
  }
`;

const TextArea = styled.textarea.attrs(props => ({ rows: 5, cols: 33 }))`
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin: 15px 0px 15px 0px;
  width: 80%;
  text-align: left;
  font-size: 16px;
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
  const [bidList, setBidList] = useState([]);

  async function closeAuction() {
    const res = await fetch(`${REQUEST_URL}auction/${props.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    // // const res = await fetch(
    // //   `${REQUEST_URL}chat-room/${userInfo.id}/${bidList[0].id}`,
    // //   {
    // //     method: 'POST',
    // //     headers: {
    // //       'Content-Type': 'application/json',
    // //       AUTH_TOKEN: userInfo.accessToken
    // //     }
    // //   }
    // // );
    const data = await res.json();
    alert('경매가 마감 되었습니다.');
    console.log(data);
  }

  async function getBidList() {
    const res = await fetch(`${REQUEST_URL}auction/${props.url}/history`, {
      headers: { AUTH_TOKEN: userInfo.accessToken }
    });
    const data = await res.json();
    console.log(data);
    setBidList(data);
  }

  const openModal = async () => {
    const res = await fetch(
      `${REQUEST_URL}${userInfo.id}/auction/${props.url}/bid/cancel-request`,
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
      `${REQUEST_URL}${userInfo.id}/auction/${props.url}/bid/cancel`,
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

  useEffect(() => {
    getBidList();
  }, []);
  return (
    <ProductInfoWrapper>
      <div className="profile">
        <HiUserCircle color="#6E44FF" size={50} />
        <div>{props.userName}</div>
      </div>
      <Border height="8px" />
      <div className="productTitle">{props.name}</div>
      <Border height="8px" />
      <div className="productPriceWrapper">
        <div className="priceType current">현재가</div>
        <div className="price current">{comma(props.currentPrice)} 원</div>
        {userInfo.isLogin &&
          props.auctionStatus !== 'AUCTION_COMPLETED' &&
          props.userType !== 'SELLER' && (
            <button onClick={openModal} className="trade">
              입찰 취소
            </button>
          )}
        {userInfo.isLogin && props.userType == 'SELLER' && (
          <button onClick={closeAuction} className="trade">
            현재가로 경매 마감하기
          </button>
        )}
      </div>
      <div className="productPriceWrapper">
        <div className="priceType">시작가</div>
        <div className="price">{comma(props.startingPrice)} 원</div>
      </div>
      <BidHistory bidHistoryCount={props.bidHistoryCount} link={props.url} />

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
                {bidData.message !== 'Bid history not exists' && (
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
                      입찰 취소
                    </Button>
                  </>
                )}
                {bidData.message === 'Bid history not exists' && (
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
    </ProductInfoWrapper>
  );
};

const ProductInfoWrapper = styled.div`
  width: 100%;
  .profile {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    div {
      margin-left: 10px;
    }
  }
  .productPriceWrapper {
    display: flex;
    .trade {
      border: 1px solid #6e44ff;
      color: #6e44ff;
      background-color: white;
      border-radius: 5px;
    }
  }
  .priceType + .price {
    margin-left: 1rem;
    flex: 1;
    margin-bottom: 10px;
  }
  .current {
    font-size: 20px;
  }
`;
export default ProductInfo;
