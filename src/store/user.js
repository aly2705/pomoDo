import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    getUserData(state) {
      const storedData = getData('userData');
      state.token = storedData.token;
      state.user = storedData.user;
    },
    addUserData(state, action) {
      const userData = action.payload;
      state.token = userData.token;
      state.user = userData.user;

      persistData('userData', state);
    },
    removeUserData(state) {
      state.token = null;
      state.user = null;

      localStorage.removeItem('userData');
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
