import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';
import { API_URL } from '../helpers/config';

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
    updateUserData(state, action) {
      const userData = action.payload;
      state.user = { name: userData.name, email: userData.email };

      persistData('userData', state);
    },
    replaceTokenOnPasswordChange(state, action) {
      const token = action.payload;
      state.token = token;

      persistData('userData', state);
    },
  },
});

// THUNK ACTION CREATORS
export const updateUserDetails = (sendRequest, formData) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const reqConfig = {
      url: `${API_URL}/users/me`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    sendRequest(reqConfig, data => {
      dispatch(userActions.updateUserData(data.data.user));
    });
  };
};

export const updatePassword = (sendRequest, formData, refs) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const reqConfig = {
      url: `${API_URL}/users/updatePassword`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    sendRequest(reqConfig, data => {
      const {
        oldPasswordInputRef,
        newPasswordInputRef,
        newPasswordConfirmInputRef,
      } = refs;
      dispatch(userActions.replaceTokenOnPasswordChange(data.data.token));
      oldPasswordInputRef.current.value = '';
      newPasswordInputRef.current.value = '';
      newPasswordConfirmInputRef.current.value = '';
    });
  };
};

export const userActions = userSlice.actions;
export default userSlice.reducer;
