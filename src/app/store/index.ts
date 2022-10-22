import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userAuthReducer from '../../entities/user/client/model/auth';
import sellerAuthReducer from '../../entities/user/seller/model/auth';
import clientProfileReducer from '../../entities/user/client/model/profile';
import roleReducer from '../../entities/user/model/role';
import bucketReducer from '../../features/client/bucket/model/bucket';

const rootReducer = combineReducers({
  userAuthReducer,
  sellerAuthReducer,
  roleReducer,
  clientProfileReducer,
  bucketReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
