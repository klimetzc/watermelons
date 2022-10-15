import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userAuthReducer from '../../entities/user/model/auth';
import sellerAuthReducer from '../../entities/user/seller/model/auth';
import roleReducer from '../../entities/user/role';

const rootReducer = combineReducers({
  userAuthReducer,
  sellerAuthReducer,
  roleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;
