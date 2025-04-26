import { ProductListStruct } from '../../models/ProductList';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

const initialState:ProductListStruct[] = [];

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductListStruct>) {
      state.push(action.payload);
    },
  },
})

export const { addProduct } = productSlice.actions

export default productSlice.reducer