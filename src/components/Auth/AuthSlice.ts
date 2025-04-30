// import { User } from '../../models/Auth';
import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit'
import { checkUser, createUser, signOut } from './AuthAPI';
import { updateUser } from '../User/UserAPI';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = AuthSlice.actions;
export const selectLoggedInUser = (state:any)=>state.auth.user;
export const selectErrors = (state:any)=>state.auth.error;
export const selectLoading = (state:any)=>state.auth.loading;
export default AuthSlice.reducer