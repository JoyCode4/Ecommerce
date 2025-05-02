import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './UserAPI';

const initialState:any = {
  userInfo:null,
  userOrders:[],
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id:any)=>{
    const response:any = await fetchLoggedInUser(id);
    return response.data;
  }
)
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id:any)=>{
    const response:any = await fetchLoggedInUserOrders(id);
    return response.data;
  }
)

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (user:any)=>{
    const response:any = await updateUser(user.id,user);
    return response.data;
  }
)


const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
      state.userInfo = action.payload;
    })
    builder.addCase(fetchLoggedInUserOrdersAsync.fulfilled,(state,action)=>{
      state.userOrders = action.payload;
    })
    builder.addCase(updateUserAsync.fulfilled,(state,action)=>{
      state.userInfo = action.payload;
    })
  },
})

export const { addProduct } = productSlice.actions

export const selectUserInfo = (state:any)=>state.user.userInfo
export const selectUserOrders = (state:any)=>state.user.userOrders

export default productSlice.reducer