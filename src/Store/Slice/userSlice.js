import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from 'Apis/userApi';

const setCookie = (name, value, days) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  let cookie_value =
    escape(value) + (days === null ? '' : `; expires =` + exdate.toUTCString());
  document.cookie = name + `=` + cookie_value;
};

const initialState = {
  status: null,
  id: null,
  accessToken: null,
  isLogin: false,
  type: null
};

export const guest = createAsyncThunk('users/guest', async phoneNumber => {
  console.log(phoneNumber);
  const res = await fetch('https://rest.dealink.co.kr/guest', {
    method: 'POST',
    headers: {
      GUEST: 'true',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phoneNumber: phoneNumber })
  });
  const data = await res.json();
  return data;
});

export const fetchUserByCode = createAsyncThunk(
  'users/fetchByCode',
  async code => {
    const res = await userApi.fetchByCode(code);
    const data = await res.json();
    sessionStorage.setItem('userInfo', data.accessToken);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('userId', data.id);
    setCookie('accessToken', data.accessToken, 1);
    return data;
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchByCode',
  async accessToken => {
    const res = await fetch(
      `https://rest.dealink.co.kr/user/refresh`,
      // `http://192.168.0.102:8080/user/refresh`,
      {
        headers: { AUTH_TOKEN: accessToken }
      }
    );
    const data = await res.json();
    console.log(data);
    sessionStorage.setItem('userInfo', data.accessToken);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('userId', data.id);

    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUser(state, action) {
      const { id, accessToken } = action.payload;
      state.id = id;
      state.accessToken = accessToken;
    }
  },
  extraReducers: {
    [fetchUserByCode.pending]: state => {
      state.status = 'loading';
    },
    // [fetchUserByCode.rejected]: (state, action) => {},
    [fetchUserByCode.fulfilled]: (state, action) => {
      const { id, accessToken } = action.payload;
      sessionStorage.setItem('userInfo', action.payload.accessToken);
      sessionStorage.setItem('accessToken', action.payload.accessToken);
      sessionStorage.setItem('userId', action.payload.id);

      state.id = id;
      state.accessToken = accessToken;
      state.isLogin = true;
      state.status = 'idle';
    },
    [fetchUser.pending]: state => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      const result =
        action.payload.message === 'Invalid Access Token' ? false : true;
      state.id = sessionStorage.getItem('userId');
      state.accessToken = sessionStorage.getItem('accessToken');
      state.isLogin = result;
      state.status = 'idle';
    },
    [guest.fulfilled]: (state, action) => {
      sessionStorage.setItem('userInfo', action.payload.accessToken);
      sessionStorage.setItem('accessToken', action.payload.accessToken);
      sessionStorage.setItem('userId', action.payload.userIndex);
      state.id = action.payload.userIndex;
      state.type = action.payload.type;
      state.isLogin = true;
    }
  }
});

// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
