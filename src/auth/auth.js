import React, { createContext } from 'react';

const Context = createContext(); // Context 를 만듭니다.

const { Provider, Consumer: authConsumer } = Context;

const authProvider = ({ children }) => {
  const state = {};
  return <Provider value={state}>{children}</Provider>;
};

export { authProvider, authConsumer };
