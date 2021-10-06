import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import logger from 'redux-logger'
import authReducer from './slices/authSlice'
import errorReducer from './slices/errorSlice'




export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})