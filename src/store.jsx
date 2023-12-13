import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../src/libs/productSlice'

export const store = configureStore({
    reducer: {
      product: productReducer,
    },
  })
  
  