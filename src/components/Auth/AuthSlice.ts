import { User } from '../../models/Auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { checkUser, createUser, signOut } from './AuthAPI';
import { updateUser } from '../User/UserAPI';

const initialState:any = {
  loggedInUser:null,
  errors:null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData:any)=>{
    const response:any = await createUser(userData);
    return response.data;
  }
)

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo:any)=>{
    const response:any = await checkUser(loginInfo);
    return response.data;
  }
)

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async (userId:number)=>{
    const response:any = await signOut(userId);
    return response.data;
  }
)

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(createUserAsync.fulfilled,(state,action)=>{
      state.loggedInUser = action.payload;
    })
    builder.addCase(checkUserAsync.rejected,(state,action)=>{
      state.errors = action.error;
    })
    builder.addCase(checkUserAsync.fulfilled,(state,action)=>{
      state.errors = null;
      state.loggedInUser = action.payload;
    })
    builder.addCase(signOutAsync.fulfilled,(state,action)=>{
      state.errors = null;
      state.loggedInUser = null;
    })
  }
})

export const { addUser } = AuthSlice.actions

export const selectLoggedInUser = (state:any)=>state.auth.loggedInUser;
export const selectErrors = (state:any)=>state.auth.errors;
export default AuthSlice.reducer