import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../../shared/api/types/interfaces';

export interface BucketState {
  bucket: IProduct[] | [];
}

const initialState: BucketState = {
  bucket: [],
};

export const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    clearBucket: (state: BucketState) => {
      state.bucket = [];
    },
    pushToBucket: (
      state: BucketState,
      payload: PayloadAction<IProduct[] | []>
    ) => {
      state.bucket = [...state.bucket, ...payload.payload];
    },
    addToBucket: (state: BucketState, payload: PayloadAction<IProduct>) => {
      state.bucket = [...state.bucket, payload.payload];
    },
    removeFromBucket: (
      state: BucketState,
      payload: PayloadAction<IProduct>
    ) => {
      state.bucket = state.bucket.filter(
        (item: IProduct) => item.id !== payload.payload.id
      );
    },
    removeOneFromBucket: (
      state: BucketState,
      payload: PayloadAction<IProduct>
    ) => {
      const index = state.bucket.findIndex(
        (item: IProduct) => item.id === payload.payload.id
      );
      if (index !== -1) state.bucket.splice(index, 1);
    },
    removeGroupFromBucket: (
      state: BucketState,
      payload: PayloadAction<number | string>
    ) => {
      state.bucket = state.bucket.filter(
        (item) => `${item.id}` !== `${payload.payload}`
      );
    },
  },
});

export const {
  pushToBucket,
  removeFromBucket,
  removeOneFromBucket,
  clearBucket,
  addToBucket,
  removeGroupFromBucket,
} = bucketSlice.actions;

export default bucketSlice.reducer;
