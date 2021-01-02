import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  accessToken: null
};

const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    fetchTest(state, action) {
      const { id, accessToken } = action.payload;
      state.id = id;
      state.accessToken = accessToken;
    }
  }
});

export const { fetchTest } = testSlice.actions;

export default testSlice.reducer;
