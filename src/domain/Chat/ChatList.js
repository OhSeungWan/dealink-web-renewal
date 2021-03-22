import React, { useEffect, useState } from 'react';

import { HiUserCircle } from 'react-icons/hi';
import { REQUEST_URL } from 'Constants/server';
import { WebSocketProvider } from 'lib/Context/WebSocket';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ChatList = () => {
  const history = useHistory();
  const userIndex = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');
  const [chatRoomList, setRoomChatList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getChatList() {
    setLoading(false);
    const res = await fetch(`${REQUEST_URL}user/${userIndex}/chat-room`, {
      headers: { AUTH_TOKEN: accessToken }
    });
    // const res = await fetch(`${Json_Server}ChatList`);
    if (res.ok) {
      const data = await res.json();
      console.log(`chatList `);
      console.log(data);

      setRoomChatList(data);
    } else {
      setRoomChatList([]);
    }
    setLoading(true);
  }

  function handleClickChatRoom(roomId, recipientId) {
    history.push(`chat/${roomId}/${recipientId}`);
  }

  useEffect(() => {
    getChatList();
  }, []);

  return (
    loading && (
      <ChatlistWrapper>
        {chatRoomList.length === 0 && <div>채팅 목록이 없습니다.</div>}
        {chatRoomList.map((chatRoom, index) => {
          return (
            <div
              className="item"
              key={index}
              onClick={() =>
                handleClickChatRoom(chatRoom.roomId, chatRoom.recipientId)
              }
            >
              <div className="image-wrapper">
                <HiUserCircle size={30} color="#6E44FF" />
                <div>{chatRoom.recipientName}</div>
              </div>
              <div className="content-wrapper">
                <div>상품명 : {chatRoom.roomName}</div>
                <div className="lastmessage">{chatRoom.message}</div>
              </div>
              {chatRoom.count > 0 && <New>{chatRoom.count}</New>}
            </div>
          );
        })}
      </ChatlistWrapper>
    )
  );
};

const New = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff4d12;
  font-size: 12px;
  padding: 2px 7px;
  border-radius: 70%;
`;

const ChatlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  .item {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0px;

    border-bottom: solid 1px #e5e6e8;

    .lastmessage {
      font-size: 12px;
    }
    .image-wrapper {
      flex: 2;
      font-size: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 50px;
      height: 50px;
      overflow: hidden;

      /* img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      } */
    }
    .content-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 7;
      justify-content: center;
      align-items: flex-start;
      div {
        text-align: left;
      }

      .lastmessage {
        color: #a09fa7;
      }
    }
  }
`;

export default ChatList;
