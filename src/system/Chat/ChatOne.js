import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GrSend } from 'react-icons/gr';
import { REQUEST_URL } from 'Constants/server';
import WebSocketContext from 'lib/Context/WebSocket';
import styled from 'styled-components';

const ChatOne = () => {
  const userIndex = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');

  const { ws, openSocket } = useContext(WebSocketContext);
  const { roomId, auctionId, userId, reciverId } = useParams();
  const [roomid, setRoomid] = useState(roomId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const addItem = item => {
    setItems(state => [
      ...state,
      { message: item.message, senderName: item.senderName }
    ]);
  };

  // ws.current.onmessage = e => {
  //   console.log('asdfasfd');
  //   const data = JSON.parse(e.data);
  //   // if (data.message !== '') addItem(data);
  //   console.log(data);
  // };

  async function getChatContents() {
    const userId = sessionStorage.getItem('userId');
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(false);
    var roomId = roomid;
    if (roomId == 'open') {
      const res = await fetch(
        `${REQUEST_URL}chat-room/${auctionId}/${userId}/${reciverId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            AUTH_TOKEN: accessToken
          }
        }
      );

      if (res.ok) {
        const data = await res.json();
        roomId = data.roomId;
        setRoomid(data.roomId);
      } else {
        roomId = 'open';
      }
    }

    const res = await fetch(
      `${REQUEST_URL}chat-room/${roomId}/${userId}/message`,
      {
        headers: { AUTH_TOKEN: accessToken }
      }
    );
    const data = await res.json();
    console.log(data);
    setItems(data);
    setLoading(true);
  }

  useEffect(() => {
    getChatContents();

    ws.current.onmessage = e => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.message !== '') addItem(data);
    };

    return () => {
      ws.current.onmessage = e => {
        const data = JSON.parse(e.data);
        console.log(data);
      };
    };
  }, []);

  return (
    loading && (
      <>
        <ChatItemWrapper className="chat-item-wrapper">
          {items.map((item, index) => {
            // console.log(item);
            return (
              item.message !== '' && (
                <ChatItem
                  className="chatitem"
                  key={index}
                  isMy={item.senderName == userIndex}
                >
                  {item.message}
                </ChatItem>
              )
            );
          })}
        </ChatItemWrapper>
        <TextInputBox
          roomId={roomid}
          setRoomId={setRoomid}
          isFirst={items.length}
          auctionId={auctionId}
          userId={userId}
          reciverId={reciverId}
        />
      </>
    )
  );
};

function TextInputBox({
  roomId,
  isFirst,
  setRoomId,
  auctionId,
  userId,
  reciverId
}) {
  const userIndex = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');
  const [message, setMessage] = useState(``);
  const [messageType, setMessageType] = useState('TALK');
  const [firstSend, setFirstSend] = useState(isFirst == 0);
  const { ws, openSocket } = useContext(WebSocketContext);

  const handleChangeText = e => {
    setMessage(e.target.value);
  };

  async function openChat() {
    console.log('open');
    const res = await fetch(
      `${REQUEST_URL}chat-room/${auctionId}/${userId}/${reciverId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AUTH_TOKEN: accessToken
        }
      }
    );
    const data = await res.json();

    ws.current.send(
      JSON.stringify({
        messageType: messageType,
        roomId: data.roomId,
        senderName: userIndex,
        senderId: userIndex,
        recipientId: reciverId,
        message: message
      })
    );

    setRoomId(data.roomId);
    setFirstSend(false);
  }

  const handleClickSubmit = async () => {
    if (firstSend && roomId == 'open') {
      console.log('firstsend');
      await openChat();
      return;
    }

    if (ws.current.readyState === 3) {
      // alert('falied');
      openSocket(sessionStorage.getItem('userId'));
    }

    ws.current.send(
      JSON.stringify({
        messageType: messageType,
        roomId: roomId,
        senderName: userIndex,
        senderId: userIndex,
        recipientId: reciverId,
        message: message
      })
    );

    console.log('done');

    setMessage('');
    setMessageType('TALK');
  };

  useEffect(() => {
    // handleClickSubmit();
  }, []);

  return (
    <TextInputBoxWrapper>
      <input type="text" value={message} onChange={handleChangeText}></input>

      {message !== '' && (
        <button className="send-btn" type="button" onClick={handleClickSubmit}>
          <GrSend size={25} />
        </button>
      )}
    </TextInputBoxWrapper>
  );
}

const ChatItemWrapper = styled.div`
  align-items: center;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin-bottom: 100px;
`;

const TextInputBoxWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  width: 95%;
  display: flex;
  justify-content: center;
  max-width: 300px;

  input {
    :focus {
      outline: none;
    }
    padding: 0px 15px;
    font-size: 20px;
    border: solid 1px #949494;
    border-radius: 50px;
    flex: 7;
    width: 80%;
    height: 50px;
  }
  .send-btn {
    position: absolute;
    display: flex;
    right: 10px;
    top: 5px;
    flex: 1;
    background-color: #6e44ff;
    border-radius: 70%;
    justify-content: center;
    align-items: center;
    padding: 5px;
    :focus {
      outline: none;
    }
  }
`;
const ChatItem = styled.div`
  align-self: ${props => {
    return props.isMy ? 'flex-end' : 'flex-start';
  }};
  background-color: ${props => {
    return props.isMy ? '#6E44FF' : 'gray';
  }};
  margin: 5px 0px;
  padding: 10px 5px;
  text-align: ${props => {
    return props.isMy ? 'right' : 'left';
  }};
  border-radius: 10px;
`;
export default ChatOne;
