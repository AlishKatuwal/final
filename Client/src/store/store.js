import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import adminProductSlice from './admin/productSlice'


const store = configureStore({
        reducer: {
            auth : authReducer,
            adminProducts : adminProductSlice,
        },
    });
    
    export default store;