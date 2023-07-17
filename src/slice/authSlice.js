import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: "",
    token: ""
  },
  reducers: {
    login: (state, action) => {
      console.log(1);
      state.username = action.payload.username;
      state.token = action.payload.token;
      console.log(this.state);
    },
   

  }
})




// Action creators are generated for each case reducer function
export const { login, register } = authSlice.actions

export default authSlice.reducer