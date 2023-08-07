import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated : false,
}

export const authSlice = createSlice({
    name: 'authorisation',
    initialState,
    reducers: {
       login : (state,action)=>{
          state.isAuthenticated = true;
          console.log('logged in')
       },
       logout : (state,action)=>{
        state.isAuthenticated = false;
        console.log('logged out')
       }
    }
});

export const { login ,logout } = authSlice.actions;
export default authSlice.reducer