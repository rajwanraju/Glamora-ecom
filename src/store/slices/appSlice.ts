import { createSlice } from '@reduxjs/toolkit';

export interface AppType {
  appName: string;
  appLoader: boolean;
  globalReFetchData: boolean;
  theme: 'light' | 'dark';
}

const initialState: AppType = {
  appName: 'ProNearMe',
  appLoader: false,
  globalReFetchData: false,
  theme: 'light',
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppName: (state, actions) => {
      state.appName = actions.payload;
    },
    setAppLoader: (state, actions) => {
      state.appLoader = actions.payload;
    },
    setGlobalReFetchData: (state) => {
      state.globalReFetchData = !state.globalReFetchData;
    },
    setTheme: (state, actions) => {
      state.theme = actions.payload;
    },
  },
});

export const { setAppName, setAppLoader, setGlobalReFetchData, setTheme } = AppSlice.actions;

export default AppSlice.reducer;
