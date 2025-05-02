// import { User } from '../../models/Auth';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import { checkUser, createUser, loginUser, signOut } from './AuthAPI';
// import { updateUser } from '../User/UserAPI';

// const initialState:any = {
//   loggedInUser:null,
//   errors:null,
//   token:null,
// };

// export const createUserAsync = createAsyncThunk(
//   'auth/createUser',
//   async (userData:any)=>{
//     const response:any = await createUser(userData);
//     return response.data;
//   }
// )

// export const checkUserAsync = createAsyncThunk(
//   'auth/checkUser',
//   async (loginInfo:any)=>{
//     const response:any = await checkUser(loginInfo);
//     return response.data;
//   }
// )

// export const signOutAsync = createAsyncThunk(
//   'auth/signOut',
//   async (userId:number)=>{
//     const response:any = await signOut(userId);
//     return response.data;
//   }
// )

// export const loginUserAsync = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials:any) => {
//     const response:any = await loginUser(credentials);
//     return response.data;
//   });

// const AuthSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers:(builder)=>{
//     // builder.addCase(createUserAsync.fulfilled,(state,action)=>{
//     //   state.loggedInUser = action.payload;
//     // })
//     // builder.addCase(checkUserAsync.rejected,(state,action)=>{
//     //   state.errors = action.error;
//     // })
//     // builder.addCase(checkUserAsync.fulfilled,(state,action)=>{
//     //   state.errors = null;
//     //   state.loggedInUser = action.payload;
//     // })
//     // builder.addCase(signOutAsync.fulfilled,(state,action)=>{
//     //   state.errors = null;
//     //   state.loggedInUser = null;
//     // })
//     builder.addCase(loginUserAsync.fulfilled, (state, action) => {
//       state.token = action.payload;
//     });
//     builder.addCase(loginUserAsync.rejected, (state, action) => {
//       state.error = action.error;
//     });
//   }
// })

// export const { logout } = AuthSlice.actions

// export const selectLoggedInUser = (state:any)=>state.auth.loggedInUser;
// export const selectErrors = (state:any)=>state.auth.errors;
// export const selectToken = (state:any)=>state.auth.token;
// export default AuthSlice.reducer


// /store/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectLoggedInUser = (state:any)=>state.auth.user;

export default authSlice.reducer;
