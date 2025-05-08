import { configureStore } from '@reduxjs/toolkit'
import productlistReducer from '../components/ProductList/ProductListSlice'
import authReducer from '../components/Auth/AuthSlice'
import cartReducer from '../components/Cart/CartSlice'
import titleReducer from './TitleSlice'
import orderReducer from '../components/Order/OrderSlice'
import userReducer from '../components/User/UserSlice'
export const store = () => {
  return configureStore({
    reducer: {
        productlist: productlistReducer,
        auth: authReducer,
        cart:cartReducer,
        title:titleReducer,
        order:orderReducer,
        user:userReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']