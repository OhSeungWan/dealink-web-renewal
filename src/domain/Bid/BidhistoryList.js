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
      {data.length === 0 && <div>아직 찜한 사람이 없어요.</div>}
      {data.map((item, index) => {
        return <BidHistoryItem item={item} key={index} auction={auction} />;
      })}
    </BidHistoryListWrapper>
  );
};

const BidHistoryItem = ({ item, auction }) => {
  const history = useHistory();
  const userId = sessionStorage.getItem('userId');

  async function openChat() {
    history.push(`/chat/open/${auction.id}/${userId}/${item.userId}`, {
      info: {
        productImage: auction.imageUrls[0],
        productName: auction.name,
        productPrice: auction.startingPrice,
        productUrl: auction.url
      }
    });
  }

  function goProfile(id) {
    history.push(`/profile/${id}`);
  }

  const time = moment(item.createdDate).format('MM.DD H:mm');
  return (
    <>
      <div className="bidHistoryItem">
        <div className="time">{time}</div>
        <div className="profilewrapper">
          <HiUserCircle className="profileIcon" size={36} color="#6e44ff" />
          <div className="userName">{item.userName}</div>
        </div>
        <div className="wrapper">
          <div className="chatBtn" onClick={() => goProfile(item.userId)}>
            프로필 보기
          </div>
          {auction.userId == userId && (
            <div className="chatBtn" onClick={openChat}>
              채팅하기
            </div>
          )}
        </div>
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
  .profilewrapper {
    width: 100%;
    display: flex;
    text-align: left;
    align-items: center;
    margin-bottom: 14px;
    margin-top: 8px;
  }
  .bidHistoryItem {
    padding: 10px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .time {
    color: #a09fa7;
    width: 100%;
    font-size: 12px;
    text-align: left;
  }
  .chatBtn {
    width: 100%;
    text-align: center;
    border: 1px solid #a09fa7;
    border-radius: 5px;
    color: black;
    padding: 6px 54px;
  }
  .chatBtn + .chatBtn {
    margin-left: 10px;
  }
  .userName {
    margin-bottom: 2px;
    font-size: 12px;
    margin-left: 14px;
  }
  .wrapper {
    text-align: left;
    width: 100%;
    font-size: 10px;
    display: flex;
    justify-content: space-between;
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
