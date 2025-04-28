import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addToCart, deleteCart, fetchCartItemsByUserId, resetCart, updateCart } from './CartAPI';
const initialState:any = {
  items:[],
  totalAmount:0,
  totalItems:0,
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item:any)=>{
    await addToCart(item);
    const response:any = await fetchCartItemsByUserId(item.user);
    return response.data;
  }
)

export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchCartItemsByUserId',
  async (id:any)=>{
    const response:any = await fetchCartItemsByUserId(id);
    return response.data;
  }
)
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (item:any)=>{
    await updateCart(item);
    const response:any = await fetchCartItemsByUserId(item.user.id);
    return response.data;
  }
)
export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (details:any)=>{
    const {user,id} = details;
     await deleteCart(id,user);
    const response:any = await fetchCartItemsByUserId(user);
    return response.data;
  }
)

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId:any)=>{
    const response:any = await resetCart(userId);
    return response.data;
  }
)




const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.totalItems = action.payload && action.payload.length && action.payload.reduce((total:number,item:any)=>Number(item.quantity)+Number(total),0);
      state.totalAmount = action.payload && action.payload.length && Math.round(action.payload.reduce((total:number,item:any)=>Number(item.product.price)*Number(item.quantity)+Number(total),0)*100)/100;
    })
    builder.addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.totalItems = action.payload && action.payload.length && action.payload.reduce((total:number,item:any)=>Number(item.quantity)+Number(total),0);
      state.totalAmount = action.payload && action.payload.length && Math.round(action.payload.reduce((total:number,item:any)=>Number(item.product.price)*Number(item.quantity)+Number(total),0)*100)/100;
    });
    builder.addCase(updateCartAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.totalItems = action.payload && action.payload.length && action.payload.reduce((total:number,item:any)=>Number(item.quantity)+Number(total),0);
      state.totalAmount = action.payload && action.payload.length && Math.round(action.payload.reduce((total:number,item:any)=>Number(item.product.price)*Number(item.quantity)+Number(total),0)*100)/100;
    });
    builder.addCase(deleteCartAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.totalItems = action.payload && action.payload.length && action.payload.reduce((total:number,item:any)=>Number(item.quantity)+Number(total),0);
      state.totalAmount = action.payload && action.payload.length && Math.round(action.payload.reduce((total:number,item:any)=>Number(item.product.price)*Number(item.quantity)+Number(total),0)*100)/100;
    });
    builder.addCase(resetCartAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.totalAmount = 0;
      state.totalItems=0;
    });
  },
})

export const { addItem } = cartSlice.actions
export const selectCart = (state:any)=>state.cart.items;
export const selectCartTotalAmount = (state:any)=>state.cart.totalAmount;
export const selectCartTotalItems = (state:any)=>state.cart.totalItems;
export default cartSlice.reducer