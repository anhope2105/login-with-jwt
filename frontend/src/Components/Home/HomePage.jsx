import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import axios from "axios"
import { loginSuccess } from "../../redux/authSlice";
import {createInstance} from "../../createInstance"

const HomePage = () => {
  const users = useSelector(state => state.auth.login.currentUser)
  const allUsers = useSelector(state => state.users.users.allUsers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiosJWT = createInstance(users , dispatch,loginSuccess)

  //DUMMY DATA
  
 
 const handleDelete = (userId) => {
  deleteUser(userId , users?.accessToken , dispatch)
 }
 
  useEffect(() => {
    if(!users){
      navigate("/login")
    }
    if(users?.accessToken){
      getAllUsers(users.accessToken,dispatch,axiosJWT)
    }
   },[users])
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role : ${users.admin ? 'admin' : 'user'}`}
      </div>
      <div className="home-userlist">
        {allUsers?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user"
              onClick={() => handleDelete(user._id)}
              > Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
