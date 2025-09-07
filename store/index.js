import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import cartReducer from './slices/cart-slice';
import glossaryReducer from './slices/glossary-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    glossary: glossaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
