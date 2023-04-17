import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";


export const loginUser = async (user ,dispatch ,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8888/api/auth/login",user)
        dispatch(loginSuccess(res.data));
        navigate('/')
    } catch (error) {
        dispatch(loginFailed(error));
    }
};
export const registerUser = async (user ,dispatch ,navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("http://localhost:8888/api/auth/register",user)
        dispatch(registerSuccess());
        navigate("/login")
    } catch (error) {
        dispatch(registerFailed(error));
        
    }
}

export const getAllUsers = async (accessToken , dispatch,axiosJWT) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get("http://localhost:8888/api/user",
        {headers : {token : `Bearer ${accessToken}`}}
        )
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailed(error))
    }
}
export const deleteUser = async (userId,accessToken , dispatch) => {
    dispatch(deleteUserStart())
    try {
        const res = await axios.delete(`http://localhost:8888/api/user/`+ userId, 
        {headers : {token : `Bearer ${accessToken}`}}
        )
        dispatch(deleteUserSuccess(res.data))
    } catch (error) {
        dispatch(deleteUserFailed(error.response.data))
    }
}
export const logoutUser = async (accessToken ,dispatch,navigate,id,axiosJWT) => {
    dispatch(logoutStart())
    try {
        await axiosJWT.post(`http://localhost:8888/api/auth/logout`,id,{
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logoutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed(error))
    }
}
