import { configureStore, combineReducers } from '@reduxjs/toolkit';
import clientProfileReducer from 'entities/user/model/clientProfile';
import userAuthReducer from 'entities/user/model/auth';
import sellerAuthReducer from 'entities/user/model/authSeller';
import roleReducer from 'entities/user/model/role';
import bucketReducer from 'features/client/bucket/model/bucket';
import { authAPI } from 'shared/api/auth';

const rootReducer = combineReducers({
  userAuthReducer,
  sellerAuthReducer,
  roleReducer,
  clientProfileReducer,
  bucketReducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
