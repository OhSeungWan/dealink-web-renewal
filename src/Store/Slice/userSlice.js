import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from 'Apis/userApi';

const initialState = {
  id: '1',
  accessToken: 'T1rAqql_ygkHR1kbDTDV7pjjisPtrg6t7gN3gAorDKYAAAF3DrjIMQA',
  isLogin: true
};

export const fetchUserByCode = createAsyncThunk(
  'users/fetchByCode',
  async (code, thunkApi) => {
    const res = await userApi.fetchByCode(code);
    const data = await res.json();
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
    [fetchUserByCode.rejected]: (state, action) => {},
    [fetchUserByCode.fulfilled]: (state, action) => {
      const { id, accessToken } = action.payload;

      sessionStorage.setItem('userInfo', action.payload.accessToken);
      sessionStorage.setItem('accessToken', action.payload.accessToken);
      sessionStorage.setItem('userId', action.payload.id);

      state.id = id;
      state.accessToken = accessToken;
      state.isLogin = true;
    }
  }
});

export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
