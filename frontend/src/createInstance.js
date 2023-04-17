import axios from "axios"
import jwt_decode from "jwt-decode"

const refreshToken  =async () => {
    try {
      const res = await axios.get("http://localhost:8888/api/auth/refresh",
      {withCredentials:true}
      )
      return res.data
    } catch (error) {
      console.log(error)
      
    }
 }

export const createInstance = (users,dispatch,stateSuccess) => {
   const newInstance = axios.create()
   newInstance.interceptors.request.use(
    async (config) => {
      const decodeToken = jwt_decode(users?.accessToken)
      const date = new Date()
      if(decodeToken.exp < date.getTime() / 1000){
        const data = await refreshToken()
        const newLogin = {
          ...users,
          accessToken: data.accessToken
        }
        dispatch(stateSuccess(newLogin))
        config.headers["token"]= "Bearer" + data.accessToken
      }
      return config
    },err => {
      return new Promise.reject(err)
    })
    return createInstance;
}