
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchProductById, fetchAllProducts, createProduct, updateProduct, fetchAllProductsAdmin } from './ProductListAPI';
import { RootState } from '../../lib/store';

const initialState:any= {
  products:[],
  selectedProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'productlist/fetchAllProducts',
  async ()=>{
    const response:any = await fetchAllProducts();
    return response.data; 
  }
)
export const fetchAllProductsAdminAsync = createAsyncThunk(
  'productlist/fetchAllProductsAdmin',
  async ()=>{
    const response:any = await fetchAllProductsAdmin();
    return response.data; 
  }
)

export const fetchProductByIdAsync = createAsyncThunk(
  'productlist/fetchProductById',
  async (id:string)=>{
    const response:any = await fetchProductById(id);
    return response.data; 
  }
)

export const createProductAsync = createAsyncThunk(
  'productlist/createProduct',
  async (product:any)=>{
    const response:any = await createProduct(product);
    return response.data; 
  }
)
export const updateProductAsync = createAsyncThunk(
  'productlist/updateProduct',
  async (product:any)=>{
    const response:any = await updateProduct(product);
    console.log(response.data);
    return response.data; 
  }
)

const productListSlice = createSlice({
  name: 'productlist',
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct=null;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchAllProductsAsync.pending,(state)=>{
    })
    builder.addCase(fetchAllProductsAsync.fulfilled,(state,action)=>{
      state.products = action.payload;
    })
    builder.addCase(fetchAllProductsAdminAsync.fulfilled,(state,action)=>{
      state.products = action.payload;
    })
    builder.addCase(fetchProductByIdAsync.pending,(state)=>{
    })
    builder.addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
      state.selectedProduct = action.payload;
    })
    builder.addCase(createProductAsync.fulfilled,(state,action)=>{
      state.products.push(action.payload);
    })
    builder.addCase(updateProductAsync.fulfilled,(state,action)=>{
      const productIndex=state.products.findIndex((p:any)=>p.id=action.payload.id);
      state.products[productIndex]=action.payload;
    })
  }
})

export const { clearSelectedProduct } = productListSlice.actions
export const selectAllProducts = (state:RootState)=> state.productlist.products;
export const selectedProduct = (state:RootState)=> state.productlist.selectedProduct;
export default productListSlice.reducer