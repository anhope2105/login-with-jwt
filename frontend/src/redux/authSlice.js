import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        login: {
            currentUser:[],
            isLoading:false,
            error:false
        },
        register : {
            isLoading:false,
            error:false,
            seccess:false,
        }
    },
    reducers: {
        loginStart : (state) => {
            state.login.isLoading = true;
        },
        loginSuccess : (state,action) => {
            state.login.isLoading = false;
            state.login.currentUser = action.payload;
        },
        loginFailed : (state,action) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
        registerStart : (state) => {
            state.register.isLoading = true;
        },
        registerSuccess : (state) => {
            state.register.isLoading = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed : (state,action) => {
            state.register.isLoading = false;
            state.register.error = true;
        },
        logoutStart : (state) => {
            state.login.isLoading = true;
        },
        logoutSuccess : (state) => {
            state.login.isLoading = false;
            state.login.currentUser = null;
            state.login.error = false

        },
        logoutFailed : (state) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
        
        
    }
});
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = authSlice.actions

export default authSlice.reducer
