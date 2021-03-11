import {
  openModal,
  useAuctionDetailDispatch
} from 'Pages/ProductDetail/AuctionDetailContext';

import { REQUEST_URL } from 'Constants/server';
import React from 'react';
import heart from 'assets/img/heart.png';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ProductBottomBtn = ({ auction }) => {
  const dispatch = useAuctionDetailDispatch();
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');
  const history = useHistory();

  async function RegisterInterest() {
    // if (parseInt(value.bidPrice) <= parseInt(data.currentPrice)) {
    //   alert('입찰가는 현재가보다 작거나 같을수 없습니다.');
    //   return;
    // }

    const res = await fetch(
      `${REQUEST_URL}user/${userId}/auction/${auction.url}/bid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AUTH_TOKEN: accessToken
        },
        body: JSON.stringify({
          bidPrice: auction.startingPrice,
          auctionId: auction.id
        })
      }
    );

    console.log(res);
  }

  function handleClick(content) {
    openModal(dispatch, content);
  }

  async function openChat() {
    // const res = await fetch(
    //   `${REQUEST_URL}chat-room/${auction.id}/${userId}/${auction.userId}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       AUTH_TOKEN: accessToken
    //     }
    //   }
    // );
    // if (res.ok) {
    //   const data = await res.json();
    //   console.log(data);
    //   history.push(
    //     `/chat/${data.roomId}/${auction.id}/${userId}/${auction.userId}`
    //   );
    // } else {
    //   console.log(res);
    //   history.push(`/chat/open/${auction.id}/${userId}/${auction.userId}`);
    // }
    history.push(`/chat/open/${auction.id}/${userId}/${auction.userId}`);
  }

  function setButton() {
    switch (auction.userId != userId) {
      case true:
        return [
          { text: '관심', onClick: () => RegisterInterest() },
          {
            text: '판매자와 1:1 채팅하기',
            onClick: () => openChat()
          }
        ];
      default:
        return [
          {
            text: '판매 종료',
            onClick: () => handleClick('changeNext')
          }
        ];
    }
  }

  const buttons = setButton();
  return (
    auction.auctionStatus !== 'AUCTION_COMPLETED' && (
      <BottomBtnWrapper>
        {buttons[1] && (
          <Btn onClick={buttons[0].onClick}>
            <img width={16} src={heart} />
          </Btn>
        )}
        {buttons[1] && (
          <ChatBtn onClick={buttons[1].onClick}>{buttons[1].text}</ChatBtn>
        )}
        {!buttons[1] && (
          <ChatBtn onClick={buttons[0].onClick}>{buttons[0].text}</ChatBtn>
        )}
      </BottomBtnWrapper>
    )
  );
};

const Btn = styled.button`
  display: flex;
  width: 100%;
  width: 60px;
  height: 60px;
  background-color: #6e44ff;
  border: none;
  border-right: solid 1px white;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ChatBtn = styled.button`
  color: white;
  height: 60px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6e44ff;
  border: none;
  /* flex: 9; */
  flex: 1;
`;

const BottomBtnWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 95%;
  max-width: 400px;
  bottom: 10px;
`;
export default ProductBottomBtn;
