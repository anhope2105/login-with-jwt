import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiRequest";
import "./navbar.css";
import {createInstance} from "../../createInstance"

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.login.currentUser)
  const id = user?._id
  const axiosJWT = createInstance(user,dispatch,navigate)
  const handleLogout = () => {
    logoutUser(user?.accessToken , dispatch , navigate,id,axiosJWT)
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, {user.username} <span></span> </p>
        <Link to="/logout" className="navbar-logout"
        onClick={handleLogout}
        > Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
