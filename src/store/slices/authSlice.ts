import { createSlice } from '@reduxjs/toolkit';

export interface UserAuthData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthType {
  isLoggedUser: boolean;
  isRememberMe: boolean;
  userAuthData: UserAuthData | null;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthType = {
  isLoggedUser: false,
  isRememberMe: false,
  userAuthData: null,
  accessToken: '',
  refreshToken: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedUser: (state, actions) => {
      state.isLoggedUser = actions.payload;
    },
    setIsRememberMe: (state, actions) => {
      state.isRememberMe = actions.payload;
    },
    setUserAuthData: (state, actions) => {
      state.userAuthData = actions.payload;
    },
    setAccessToken: (state, actions) => {
      state.accessToken = actions.payload;
    },
    setRefreshToken: (state, actions) => {
      state.refreshToken = actions.payload;
    },
    setUserLogout: (state) => {
      state.isLoggedUser = false;
      state.isRememberMe = false;
      state.userAuthData = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
    updateUserDataKeyAgainstValue: (state, action) => {
      let data = state.userAuthData;
      data = { ...data, [action?.payload?.key]: action?.payload?.value } as UserAuthData;
      state.userAuthData = data;
    },
  },
});

export const {
  setIsLoggedUser,
  setIsRememberMe,
  setUserAuthData,
  setAccessToken,
  setRefreshToken,
  setUserLogout,
  updateUserDataKeyAgainstValue,
} = AuthSlice.actions;

export default AuthSlice.reducer;
