import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Context} from '../../main';
import toast from 'react-hot-toast';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import {FaPhoneFlip} from 'react-icons/fa6';

import { Link, Navigate } from 'react-router-dom';
import { RiLock2Fill } from 'react-icons/ri';

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context)

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v2/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
      toast.success(data.message);
      setName("");
      setEmail("")
      setPassword("")
      setPhone("")
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
            <h3>Create a new account</h3>
          </div>

          <form>
          {/* role  input */}
            <div className="inputTag">
                <label>Register As</label>
                <div>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value= ""> Select role </option>
                    <option value= "Employer">Employer</option>
                    <option value= "job sekker">Job sekker</option>
                  </select>
                  <FaRegUser/>
                </div>
            </div>


            {/* name input */}
            <div className="inputTag">
                <label>Name</label>
                <div>
                 <input type="text" value={name} onChange={(e)=> setName(e.target.value)}
                 placeholder="Type your name"></input>
                  <FaPencilAlt/>
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

            {/* password */}

            <div className="inputTag">
                <label>Phone</label>
                <div>
                 <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)}
                 placeholder="Type your Number"></input>
                  <FaPhoneFlip/>
                </div>
            </div>

          <button onClick={handleRegister} type="submit">Register</button>
          <Link to={"/Login"}> Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="Register"></img>
        </div>
      </div>
    </>
  )
}

export default Register
