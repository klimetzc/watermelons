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
  },
});

export const { pushToBucket, removeFromBucket, clearBucket, addToBucket } =
  bucketSlice.actions;

export default bucketSlice.reducer;
