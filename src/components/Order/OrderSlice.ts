import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addOrder, fetchAllOrders, updateOrder } from './OrderAPI';

const initialState:any= {
  orders:[],
  currentOrder:null,
  totalOrders:0,
};

export const addToOrderAsync = createAsyncThunk(
  'order/addToOrder',
  async (item:any)=>{
    const response:any = await addOrder(item);
    return response.data;
  }
)
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (options?: { asc?: boolean })=>{
    const asc = options?.asc ?? true;
    const response:any = await fetchAllOrders();
    response.data.sort((a:any,b:any)=>{
      if(asc){
        return a.id - b.id;
      }else{
        return b.id - a.id;
      }
    })
    return response.data;
  }
)
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order:any)=>{
    await updateOrder(order);
    const response:any = await fetchAllOrders();
    console.log(response.data);
    return response.data;
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state)=>{
      state.currentOrder = null;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(addToOrderAsync.fulfilled,(state,action)=>{
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
      state.totalOrders +=1;
    })
    builder.addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
      state.orders = action.payload;
      state.totalOrders = action.payload?.length || 0;
    })
    builder.addCase(updateOrderAsync.fulfilled,(state,action)=>{
      state.orders = action.payload;
    })
  }
})

export const { resetOrder } = orderSlice.actions

export const selectCurrentOrder = (state:any)=>state.order.currentOrder;
export const selectOrders = (state:any)=>state.order.orders;
export const selectTotalOrders = (state:any)=>state.order.totalOrders;


export default orderSlice.reducer