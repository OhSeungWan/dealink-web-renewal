import { AiFillHeart } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import { REQUEST_URL } from 'Constants/server';
import React from 'react';
import { comma } from 'lib/Utils/comma-utils';
import moment from 'moment';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const BidHistoryList = ({ data, auction }) => {
  return (
    <BidHistoryListWrapper>
      {data.length === 0 && <div>경매 기록이 존재 하지 않습니다.</div>}
      {data.map((item, index) => {
        return <BidHistoryItem item={item} key={index} auction={auction} />;
      })}
    </BidHistoryListWrapper>
  );
};

const BidHistoryItem = ({ item, auction }) => {
  const history = useHistory();
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');

  async function openChat() {
    const res = await fetch(
      `${REQUEST_URL}chat-room/${auction.id}/${userId}/${item.userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AUTH_TOKEN: accessToken
        }
      }
    );
    const data = await res.json();
    history.push(`/chat/${data.roomId}/`);
    console.log(data);
  }

  function goProfile(id) {
    history.push(`/profile/${id}`);
  }

  const time = moment(item.createdDate).format('YYYY-MM-DD H:mm');

  return (
    <>
      <div className="bidHistoryItem">
        <div className="time">{time}</div>
        <div className="wrapper">
          <HiUserCircle
            className="profileIcon"
            size={20}
            color="#6e44ff"
            style={{ flex: 1 }}
          />
          <div className="userName">{item.userName}</div>
        </div>
        <div className="wrapper">
          <div className="chatBtn" onClick={() => goProfile(item.userId)}>
            프로필 보기
          </div>
          <div className="chatBtn" onClick={openChat}>
            채팅하기
          </div>
        </div>
        {/* <div className="price">{comma(item.bidPrice)}원</div> */}
        <AiFillHeart color="#FF2F2F" style={{ flex: 1 }} />
      </div>
      <hr />
    </>
  );
};

const BidHistoryListWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  hr {
    border: solid 1px #f5f5f7;
    width: 100%;
  }

  .bidHistoryItem {
    padding: 10px 0px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .time {
    font-size: 14px;
    flex: 3;
  }
  .chatBtn {
    width: 100%;
    text-align: center;
    border: 1px solid #6e44ff;
    border-radius: 5px;
    color: #6e44ff;
  }
  .profileBtn {
    width: 80%;
    text-align: center;
    border: 1px solid #6e44ff;
    border-radius: 5px;
    color: #6e44ff;
    font-size: 10px;
    background-color: white;
  }
  .userName {
    margin-bottom: 2px;
  }
  .wrapper {
    flex: 3;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    padding: 0px 3px;
    text-align: center;
    flex: 2;
  }
`;

export default BidHistoryList;
