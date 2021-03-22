import { BASE_URL, REQUEST_URL } from 'Constants/server';
import React, { createContext, useContext, useReducer, useRef } from 'react';

import axios from 'axios';

export async function getAuctionDetail(dispatch, userId, url) {
  dispatch({ type: `GET_AUCTION` });
  try {
    const response = await axios.get(`${REQUEST_URL}user/${1}/auction/${url}`);
    dispatch({ type: `GET_AUCTION_SUCCESS`, data: response.data });
  } catch (e) {
    dispatch({ type: `GET_AUCTION_ERROR`, error: e });
  }
}

export async function registerAuctionComment(
  dispatch,
  auctionId,
  userIndex,
  comment
) {
  dispatch({ type: `REGISTER_AUCTION_COMMENT` });
  dispatch({ type: 'GET_AUCTION_COMMENT' });
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.post(
      `${REQUEST_URL}${auctionId}/comment/${userIndex}`,
      {
        description: comment
      },
      {
        headers: { AUTH_TOKEN: accessToken }
      }
    );
    dispatch({ type: `REGISTER_AUCTION_COMMENT_SUCCESS`, data: response.data });
  } catch (e) {
    dispatch({ type: `REGISTER_AUCTION_COMMENT_ERROR`, error: e });
  }
}

export async function getAuctionComment(dispatch, auctionIndex) {
  dispatch({ type: 'GET_AUCTION_COMMENT' });
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      `${REQUEST_URL}auction/${auctionIndex}/comment`,
      {
        headers: { AUTH_TOKEN: accessToken }
      }
    );
    dispatch({ type: `GET_AUCTION_COMMENT_SUCCESS`, data: response.data });
  } catch (e) {
    dispatch({ type: `GET_AUCTION_COMMENT_ERROR`, error: e });
  }
}

export async function getAuctionBidHistory(dispatch, link) {
  const accessToken = sessionStorage.getItem('accessToken');
  dispatch({ type: `GET_AUCTION_BIDHISTORY` });
  try {
    const response = await axios.get(`${REQUEST_URL}auction/${link}/history`, {
      headers: { AUTH_TOKEN: accessToken }
    });
    dispatch({ type: `GET_AUCTION_BIDHISTORY_SUCCESS`, data: response.data });
  } catch (e) {
    dispatch({ type: `GET_AUCTION_BIDHISTORY_ERROR`, error: e });
  }
}

export function openModal(dispatch, content) {
  document.getElementsByTagName('body')[0].className = 'modal-open';
  dispatch({ type: 'MODAL_OPEN', content: content });
}

export function closeModal(dispatch) {
  document.getElementsByTagName('body')[0].className = '';
  dispatch({ type: 'MODAL_CLOSE', content: '' });
}

const initialState = {
  bid: {
    loading: false,
    data: null,
    error: null
  },
  auction: {
    loading: false,
    data: null,
    error: null
  },
  pagesInfo: {},
  modal: {
    open: false,
    content: null
  },
  comment: {
    loading: false,
    data: null,
    error: null
  }
};

const loadingState = {
  loading: true,
  data: null,
  error: null
};

const success = data => {
  return {
    loading: false,
    data,
    error: null
  };
};

const error = data => ({
  loading: false,
  data,
  error: error
});

function AuctionDetailReducer(state, action) {
  switch (action.type) {
    case 'GET_AUCTION':
      return {
        ...state,
        auction: loadingState
      };
    case 'GET_AUCTION_SUCCESS':
      return {
        ...state,
        auction: success(action.data)
      };
    case 'GET_AUCTION_ERROR':
      return {
        ...state,
        auction: error(action.error)
      };
    case 'CLOSE_AUCTION':
      return {
        ...state,
        auction: loadingState
      };
    case 'REGISTER_AUCTION_COMMENT':
      return {
        ...state,
        comment: loadingState
      };
    case 'REGISTER_AUCTION_COMMENT_SUCCESS':
      return {
        ...state,
        comment: success(action.data)
      };

    case 'REGISTER_AUCTION_COMMENT_ERROR':
      return {
        ...state,
        comment: error(action.error)
      };
    case 'GET_AUCTION_COMMENT':
      return {
        ...state,
        comment: loadingState
      };
    case 'GET_AUCTION_COMMENT_SUCCESS':
      return {
        ...state,
        comment: success(action.data)
      };
    case 'GET_AUCTION_COMMENT_ERROR':
      return {
        ...state,
        comment: error(action.error)
      };
    case 'GET_AUCTION_BIDHISTORY':
      return {
        ...state,
        bid: loadingState
      };
    case 'GET_AUCTION_BIDHISTORY_SUCCESS':
      return {
        ...state,
        bid: success(action.data)
      };
    case 'GET_AUCTION_BIDHISTORY_ERROR':
      return {
        ...state,
        bid: error(action.error)
      };
    case 'MODAL_OPEN':
      return {
        ...state,
        modal: { ...state.modal, open: true, content: action.content }
      };
    case 'MODAL_CLOSE':
      return {
        ...state,
        modal: { ...state.modal, open: false, content: '' }
      };
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const AuctionDetailContext = createContext(null);
const AuctionDetailDispatchContext = createContext(null);

export function AuctionDetailProvider({ children }) {
  const [state, dispatch] = useReducer(AuctionDetailReducer, initialState);

  return (
    <AuctionDetailContext.Provider value={state}>
      <AuctionDetailDispatchContext.Provider value={dispatch}>
        {children}
      </AuctionDetailDispatchContext.Provider>
    </AuctionDetailContext.Provider>
  );
}

export function useAuctionDetailState() {
  const state = useContext(AuctionDetailContext);
  if (!state) {
    throw new Error('Cannot find AuctionDetailProvider');
  }
  return state;
}

export function useAuctionDetailDispatch() {
  const dispatch = useContext(AuctionDetailDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find AuctionDetailProvider');
  }
  return dispatch;
}
