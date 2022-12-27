import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import  userAuthReducer  from '../slice/userAuthSlice'

import  socketReducer from '../slice/socketSlice'
import callReducer from '../slice/callSlice'
import RTCReducer from '../slice/RTCSlice'
import messageReducer from '../slice/messageSlice'
export const store = configureStore({
  reducer: {
    message: messageReducer,
    userAuth: userAuthReducer,
    socket:socketReducer,
    call:callReducer,
    RTC:RTCReducer
  },

})
setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch