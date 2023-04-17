import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"users",
    initialState:{
        users: {
            allUsers:[],
            isLoading:false,
            error:false,
        },
        msg:''
    },
    reducers: {
        getUsersStart : (state) => {
            state.users.isLoading = true;
        },
        getUsersSuccess : (state,action) => {
            state.users.isLoading = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed : (state,action) => {
            state.users.isLoading = false;
            state.users.error = true;
        },
        deleteUserStart : state => {
            state.users.isLoading = true;
        },
        deleteUserSuccess : (state,action) => {
            state.users.isLoading = false;
            state.msg = action.payload
        },
        deleteUserFailed : (state,action) => {
            state.users.isLoading=false
            state.msg = action.payload
            state.users.error = true
        }
        
    }
});
export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
} = userSlice.actions

export default userSlice.reducer
