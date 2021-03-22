import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import ChatContext from 'domain/Chat/ChatContext';
import { FaRegUser } from 'react-icons/fa';
import { GrSend } from 'react-icons/gr';
import { REQUEST_URL } from 'Constants/server';
import { RiArrowRightSLine } from 'react-icons/ri';
import WebSocketContext from 'lib/Context/WebSocket';
import { comma } from 'lib/Utils/comma-utils';
import moment from 'moment';
import styled from 'styled-components';

const ChatOne = () => {
  const location = useLocation();
  const userIndex = sessionStorage.getItem('userId');
  const { ws } = useContext(WebSocketContext);
  const { roomId, auctionId, userId, reciverId } = useParams();
  const [roomid, setRoomid] = useState(roomId);
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState(location.state?.info);
  const [loading, setLoading] = useState(false);
  const { actions } = useContext(ChatContext);

  const addItem = item => {
    setItems(state => [
      ...state,
      { message: item.message, recipientId: item.recipientId }
    ]);
  };

  async function getChatContents() {
    const userId = sessionStorage.getItem('userId');
    const accessToken = sessionStorage.getItem('accessToken');

    setLoading(false);
    var _roomId = roomid;
    if (_roomId == 'open') {
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
        _roomId = data.roomId;
        setRoomid(data.roomId);
      } else {
        _roomId = 'open';
      }
    }

    const res = await fetch(
      `${REQUEST_URL}chat-room/${_roomId}/${userId}/message`,
      {
        headers: { AUTH_TOKEN: accessToken }
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log(`messagelist`);
      console.log(data);

      setItems(data.chatMessageResponseList);
      setProduct({
        productImage: data.productImage,
        productName: data.productName,
        productPrice: data.productPrice,
        productUrl: data.productUrl
      });
    } else {
      const data = await res.json();
      console.log(data);
      setItems([]);
    }
    ws.current.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.message !== '') addItem(data);
    };
    setLoading(true);
  }

  useEffect(() => {
    getChatContents();

    return () => {
      ws.current.onmessage = e => {
        actions.getChatList();
      };
    };
  }, []);

  useEffect(() => {
    const tolist = document.getElementsByClassName('chatitem');
    const to = tolist[tolist.length - 1]?.offsetTop;
    window.scroll({ top: to, behavior: 'smooth' });
  }, [items, loading]);

  const history = useHistory();

  const handleClickProduct = () => {
    history.push(`/Product/info/0/${product.productUrl}`);
  };
  return (
    loading && (
      <>
        <ChatItemWrapper className="chat-item-wrapper">
          <ChatTop onClick={handleClickProduct}>
            <ProductImg src={product.productImage} />
            <ProductInfoWrap>
              <ProductName>{product.productName}</ProductName>
              <ProductPrice>{comma(product.productPrice)}원</ProductPrice>
            </ProductInfoWrap>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <RiArrowRightSLine
                size={25}
                style={{ justifySelf: 'flex-end' }}
              />
            </div>
          </ChatTop>
          <div style={{ marginTop: 90 }}></div>
          {items.map((item, index) => {
            return (
              item.message !== '' && (
                <>
                  {item.recipientId == userIndex && (
                    <SenderName> {item.senderName}</SenderName>
                  )}
                  <ChatContainer isMy={item.recipientId != userIndex}>
                    {item.recipientId != userIndex && (
                      <Date isMy={item.recipientId != userIndex}>
                        {moment(item.createdDate).format('HH:mm')}
                      </Date>
                    )}
                    {item.recipientId == userIndex && (
                      <FaRegUser
                        size={50}
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          history.push(`/profile/${reciverId}`);
                        }}
                      />
                    )}
                    <ChatItem
                      className="chatitem"
                      key={index}
                      isMy={item.recipientId != userIndex}
                    >
                      {item.message}
                    </ChatItem>
                    {item.recipientId != userIndex && (
                      <Date isMy={item.recipientId != userIndex}>
                        {moment(item.createdDate).format('HH:mm')}
                      </Date>
                    )}
                  </ChatContainer>
                </>
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
const ProductInfoWrap = styled.div`
  margin-left: 10px;
`;
const ProductPrice = styled.div``;
const ProductName = styled.div`
  font-weight: 600;
`;
const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 5px;
`;

const ChatTop = styled.div`
  position: fixed;
  top: 65px;
  background-color: #f5f5f7;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

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
    setRoomId(data.roomId);
    setFirstSend(false);
    return data.roomId;
  }

  function se(payload, callback) {
    waitForConnection(function () {
      ws.current.send(JSON.stringify(payload));
      if (typeof callback !== 'undefined') {
        callback();
      }
    }, 1000);
  }

  function waitForConnection(callback, interval) {
    console.log(`ws.current.readyState  :${ws.current.readyState}`);
    if (ws.current.readyState === 1) {
      callback();
    } else {
      // optional: implement backoff for interval here
      setTimeout(function () {
        waitForConnection(callback, interval);
      }, interval);
    }
  }

  const makePayLoad = async () => {
    let _roomId;
    if (firstSend && roomId == 'open') {
      _roomId = await openChat();
    } else {
      _roomId = roomId;
    }

    return {
      messageType: messageType,
      roomId: _roomId,
      senderName: userIndex,
      senderId: userIndex,
      recipientId: reciverId,
      message: message
    };
  };
  const handleFocus = () => {
    if (ws.current.readyState === 3) {
      window.location.reload();
    }
  };
  const handleClickSubmit = async () => {
    const payload = await makePayLoad();
    if (ws.current.readyState === 3) {
      // window.location.reload();
      return;
      openSocket(sessionStorage.getItem('userId'));
    }

    se(payload, () => {
      setMessage('');
      setMessageType('TALK');
    });
  };

  return (
    <TextInputBoxWrapper>
      <input
        type="text"
        value={message}
        onChange={handleChangeText}
        onFocus={handleFocus}
      ></input>

      {message !== '' && (
        <button className="send-btn" type="button" onClick={handleClickSubmit}>
          <GrSend size={25} />
        </button>
      )}
    </TextInputBoxWrapper>
  );
}

const SenderName = styled.div`
  font-size: 12px;
  width: 100%;
`;

const ChatItemWrapper = styled.div`
  width: 100%;
  align-items: center;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin-bottom: 100px;
`;

const TextInputBoxWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  box-sizing: border-box;
  padding: 0px 10px;
  width: 100%;
  display: flex;
  justify-content: center;

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
    right: 20px;
    top: 7px;
    flex: 1;
    background-color: #6e44ff;
    border-radius: 70%;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 5px;
    :focus {
      outline: none;
    }
  }
`;
const ChatItem = styled.div`
  width: 100%;
  background-color: ${props => {
    return props.isMy ? '#6E44FF' : '#A09FA7';
  }};
  color: ${props => {
    return props.isMy ? 'white' : 'black';
  }};
  margin: 5px 0px;
  padding: 5px 10px;

  border-radius: 10px;
`;

const Date = styled.div`
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  font-size: 12px;
  color: #605f65;

  text-align: ${props => {
    return props.isMy ? 'right' : 'left';
  }};

  hr {
    flex: 1;
    width: 100%;
    height: 0px;
    border-top: 1px solid #eaeaea;
  }
  /* border: solid 1px #eaeaea; */
`;

const ChatContainer = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: ${props => {
    return props.isMy ? 'flex-end' : 'flex-start';
  }};
`;

// const ChatOneWrapper = styled.div`
//   width: 100%;
//   display:flex
// `;
export default ChatOne;
