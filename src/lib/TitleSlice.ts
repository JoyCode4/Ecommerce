import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

interface TitleState{
    pageTitle:string;
}
const initialState:TitleState = {pageTitle:"E-Commerce"};

const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle=action.payload;
    },
  },
})

export const { setPageTitle } = titleSlice.actions
// export const titleState = useSelector((state:any)=>state.title);
export default titleSlice.reducer