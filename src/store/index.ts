import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import appSlice, { type AppType } from './slices/appSlice';
import authSlice, { type AuthType } from './slices/authSlice';
import cartSlice, { type CartType } from './slices/cartSlice';

export interface RootState {
  app: AppType;
  auth: AuthType;
  cart: CartType;
}

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: 'root',
  storage: createWebStorage('local'),
  whitelist: ['auth', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const resetStore = async (): Promise<void> => {
  await createWebStorage('local').removeItem('persist:root');

  const persistor = persistStore(store);
  persistor.purge().catch((error) => {
    console.error('Error purging persistor:', error);
  });

  store.dispatch({ type: 'RESET_STORE' });
};

export const persistor = persistStore(store);
