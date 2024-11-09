
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading: false,
    productList: [],
};
export const addNewProduct = createAsyncThunk('/products/addNewProduct', async(formData)=>{
  const result = await axios.post('http://localhost:5000/api/admin/product/add',formData,{
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  console.log(result);
  return result?.data;
   
})
export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async(formData)=>{
    const result = await axios.get('http://localhost:5000/api/admin/product/get')
    return result?.data;
   
});
export const editAllProducts = createAsyncThunk('/products/editAllProducts', async(id,formData)=>{
    const result = await axios.put('http://localhost:5000/api/admin/product/edit/${id}',formData,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return result?.data;
   
})
export const deleteProduct = createAsyncThunk('/products/deleteProduct', async(id,formData)=>{
    const result = await axios.delete('http://localhost:5000/api/admin/product/delete/${id}',formData,)
    return result?.data;
   
})
export const AdminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data ;
        })
        .addCase(fetchAllProducts.rejected, (state) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
  });

export default AdminProductSlice.reducer;