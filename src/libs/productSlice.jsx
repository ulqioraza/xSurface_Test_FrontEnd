import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit"
import axios from "axios";

const server = 'http://localhost:9000'
const PRO_URL = server + '/products'
const PROIM_URL = server + '/all_products_image'

const postOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
}

const getOptions = {
    method: 'GET',
    Headers: {'Access-Control-Allow-Origin': '*'}
};

export const fetchProductImg = createAsyncThunk(
    'product/fetchProductImg',
  
    async () => {
      const response = await axios.get(PROIM_URL);
      //alert(JSON.stringify(response.data))
      return response.data;
    }
);

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
  
    async (search) => {
      const response = await axios.post(PRO_URL, {search:search});
      //alert(JSON.stringify(response.data))
      return response.data;
    }
);

const initialState = {
    product: [],
    product_img: [],
    status: 'idle',
    prod_img_status: 'idle',
    error: null,
    prod_img_error: null
  };

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },extraReducers: (builder) =>{
        builder
        .addCase(fetchProduct.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.product = action.payload;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchProductImg.pending, (state) => {
            state.prod_img_status = 'loading';
        })
        .addCase(fetchProductImg.fulfilled, (state, action) => {
            state.prod_img_status = 'succeeded';
            state.product_img = action.payload;
        })
        .addCase(fetchProductImg.rejected, (state, action) => {
            state.prod_img_status = 'failed';
            state.prod_img_error = action.error.message;
        })
    }
})

export const selectAllProduct = (state) => state.product.product
export const getProductStatus = (state) => state.product.status
export const getProductError = (state) => state.product.error
export const selectAllProductIMG = (state) => state.product.product_img
export const getProductImgStatus = (state) => state.product.prod_img_status
export const getProductImgError = (state) => state.product.prod_img_error

export default productSlice.reducer