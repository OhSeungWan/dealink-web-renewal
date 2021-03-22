import React, { createContext, useState } from 'react';

import { REQUEST_URL } from 'Constants/server';

const ChatContext = createContext({
  state: { chatList: [] },
  actions: { getChatList: () => {} }
});

const ChatProvider = ({ children }) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');
  const userIndex = sessionStorage.getItem('userId');

  console.log(`chatRoomList :${chatRoomList}`);

  async function getChatList() {
    const res = await fetch(`${REQUEST_URL}user/${userIndex}/chat-room`, {
      headers: { AUTH_TOKEN: accessToken }
    });
    // const res = await fetch(`${Json_Server}ChatList`);
    if (res.ok) {
      const data = await res.json();
      setChatRoomList(data);
    } else {
      setChatRoomList([]);
    }
  }

  const value = {
    state: {
      chatRoomList
    },
    actions: {
      getChatList
    }
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const { Consumer: ChatConsumer } = ChatContext;
export { ChatProvider, ChatConsumer };
export default ChatContext;
