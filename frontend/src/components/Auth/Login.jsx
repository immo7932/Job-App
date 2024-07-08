import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Context} from '../../main';
import toast from 'react-hot-toast';
import {  FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

import { Link, Navigate } from 'react-router-dom';
import { RiLock2Fill } from 'react-icons/ri';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v2/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
      toast.success(data.message);
     
      setEmail("")
      setPassword("")
      setRole("")
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if (isAuthorized) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo"/>
            <h3>Login to your account</h3>
          </div>

          <form>
          {/* role  input */}
            <div className="inputTag">
                <label>Login As</label>
                <div>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value= ""> Select role </option>
                    <option value= "Employer">Employer</option>
                    <option value= "job sekker">Job sekker</option>
                  </select>
                  <FaRegUser/>
                </div>
            </div>


           

            {/*  email input*/}

            <div className="inputTag">
                <label>Email</label>
                <div>
                 <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}
                 placeholder="Type your email"></input>
                  <MdOutlineMailOutline/>
                </div>
            </div>

            {/* password */}

            <div className="inputTag">
                <label>Password</label>
                <div>
                 <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
                 placeholder="Type your strong Password"></input>
                  <RiLock2Fill/>
                </div>
            </div>

           

          <button onClick={handleLogin} type="submit">Login</button>
          <Link to={"/register"}> Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="Login"></img>
        </div>
      </div>
    </>
  )
}

export default Login;
