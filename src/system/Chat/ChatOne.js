import React, { useContext, useEffect, useState } from 'react';

import { GrSend } from 'react-icons/gr';
import { REQUEST_URL } from 'Constants/server';
import WebSocketContext from 'lib/Context/WebSocket';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ChatOne = () => {
  const userIndex = sessionStorage.getItem('userId');

  const ws = useContext(WebSocketContext);
  const { roomId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const addItem = item => {
    setItems([
      ...items,
      { message: item.message, senderName: item.senderName }
    ]);
  };

  ws.current.onmessage = e => {
    const data = JSON.parse(e.data);
    if (data.message !== '') addItem(data);
  };

  async function getChatContents() {
    setLoading(false);
    const accessToken = sessionStorage.getItem('accessToken');
    const res = await fetch(`${REQUEST_URL}chat-room/${roomId}/message`, {
      headers: { AUTH_TOKEN: accessToken }
    });
    const data = await res.json();
    console.log(data);
    setItems(data);
    setLoading(true);
  }

  useEffect(() => {
    getChatContents();
  }, []);

  return (
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
      <TextInputBox roomId={roomId}></TextInputBox>
    </>
  );
};

function TextInputBox({ roomId }) {
  const userIndex = sessionStorage.getItem('userId');
  const [message, setMessage] = useState(``);
  const [messageType, setMessageType] = useState('ENTER');
  const ws = useContext(WebSocketContext);

  const handleChangeText = e => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    console.log(userIndex);
    ws.current.send(
      JSON.stringify({
        messageType: messageType,
        roomId: roomId,
        senderName: userIndex,
        message: message
      })
    );
    setMessage('');
    setMessageType('TALK');
  };

  useEffect(() => {
    handleClickSubmit();
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
