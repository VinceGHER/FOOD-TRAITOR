import { createSlice } from '@reduxjs/toolkit'
import testAuth from './testAuth.json'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: false,
    userToken: null,
    userId: null,
  },
  // initialState: testAuth,
  reducers: {
    autoSignIn: (state,action) => {
      state.logged = true
    },
    signIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

        state.userToken = action.payload.token
        state.userId= action.payload.userId
        state.logged = true
    },
    signOut: (state, action) => {
      state.userToken = null
      state.userId = null
      state.logged = false
  },
  },
})

// // Action creators are generated for each case reducer function
export const { autoSignIn,signIn , signOut } = authSlice.actions

export default authSlice.reducer