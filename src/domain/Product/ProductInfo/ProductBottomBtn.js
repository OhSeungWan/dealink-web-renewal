import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import React, { useEffect } from 'react';
import {
  getAuctionBidHistory,
  getAuctionDetail,
  openModal,
  useAuctionDetailDispatch,
  useAuctionDetailState
} from 'Pages/ProductDetail/AuctionDetailContext';

import { REQUEST_URL } from 'Constants/server';
import { confirmAlert } from 'react-confirm-alert'; // Import
import heart from 'assets/img/heart.png';
import heartFill from 'assets/img/heartFill.png';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ProductBottomBtn = ({ auction, bidData }) => {
  const dispatch = useAuctionDetailDispatch();
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');
  const history = useHistory();
  const state = useAuctionDetailState();
  // const { data: bidData, loading, error } = state.bid;
  console.log(auction);
  async function RegisterInterest() {
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

    getAuctionDetail(dispatch, '0', auction.url);
    getAuctionBidHistory(dispatch, auction.url);
  }

  async function handleClick() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1>판매가 종료됩니다.</h1>
            <p>판매가 종료되면 채팅연결이 불가능합니다.</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '100%'
              }}
            >
              <button
                style={{ border: 'none', width: '90%', margin: 5, padding: 5 }}
                onClick={onClose}
              >
                취소
              </button>
              <button
                style={{ border: 'none', width: '90%', margin: 5, padding: 5 }}
                onClick={async () => {
                  await fetch(`${REQUEST_URL}auction/${auction.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                  });

                  // const data = await res.json();
                  alert('판매가 마감 되었습니다.');

                  onClose();
                  getAuctionDetail(dispatch, '0', auction.url);
                  getAuctionBidHistory(dispatch, auction.url);
                }}
              >
                판매종료
              </button>
            </div>
          </div>
        );
      }
    });

    // openModal(dispatch, content);
  }

  async function openChat() {
    history.push(`/chat/open/${auction.id}/${userId}/${auction.userId}`, {
      info: {
        productImage: auction.imageUrls[0],
        productName: auction.name,
        productPrice: auction.startingPrice,
        productUrl: auction.url
      }
    });
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

  useEffect(() => {
    // getAuctionBidHistory(dispatch, auction.url);
  }, [bidData]);
  // if (error) return <div>에러가 발생했습니다</div>;
  if (!bidData) return <div>asdf</div>;

  const buttons = setButton();
  return (
    auction.auctionStatus !== 'AUCTION_COMPLETED' && (
      <BottomBtnWrapper>
        {buttons[1] && (
          <Btn onClick={buttons[0].onClick}>
            {bidData.find(item => item.userId == userId) ? (
              <img width={16} src={heartFill} />
            ) : (
              <img width={16} src={heart} />
            )}
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
