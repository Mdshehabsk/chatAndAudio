import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
interface userAuthState {
  token: string | null;
  user: null | any;
}
export const initialState: userAuthState = {
  token: '',
  user: '',
};
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    initialState.token = token;
    const decode:any = jwt_decode(token);
    if(Date.now() > decode.exp * 1000 ) {
       localStorage.removeItem('token')
    }else {
        initialState.user = decode;
    }
  }
}
const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      // state.token = action.payload
      // state.user = jwt_decode(action.payload)
    },
    getToken: (state) => {
      return state;
    },
    removeToken : state => {
      localStorage.removeItem('token')
      state.token = ''
      state.user = ''
    }
  },
});


export const { setToken, getToken ,removeToken} = userAuthSlice.actions;

export default userAuthSlice.reducer;
