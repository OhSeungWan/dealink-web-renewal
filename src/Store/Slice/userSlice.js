import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from 'Apis/userApi';

const setCookie = (name, value, days) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  let cookie_value =
    escape(value) + (days == null ? '' : `; expires =` + exdate.toUTCString());
  document.cookie = name + `=` + cookie_value;
};

// const getCookie = cookie_name => {
//   var x, y;
//   var val = document.cookie.split(`;`);

//   for (var i = 0; i < val.length; i++) {
//     x = val[i].substr(0, val[i].indexOf(`=`));
//     y = val[i].substr(val[i].indexOf(`=`) + 1);
//     x = x.replace(/^\s+|\s+$/g, '');

//     if (x == cookie_name) {
//       return unescape(y);
//     }
//   }
// };

const initialState = {
  status: null,
  id: null,
  accessToken: null,
  isLogin: false
};

export const fetchUserByCode = createAsyncThunk(
  'users/fetchByCode',
  async (code, thunkApi) => {
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
        action.payload.message == 'Invalid Access Token' ? false : true;
      state.id = sessionStorage.getItem('userId');
      state.accessToken = sessionStorage.getItem('accessToken');
      state.isLogin = result;
      state.status = 'idle';
    }
  }
});

// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
