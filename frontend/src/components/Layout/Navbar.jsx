import React, { useContext, useState } from 'react';
import { Context } from "../../main.jsx";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v2/user/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/Login");
    } catch (error) {
      toast.error(error.response.data.message)
      ,setIsAuthorized(true)
    }
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="JobZee-logos__white.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/getall"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to={"/Application/my"} onClick={() => setShow(false)}>
                {user && user.role === "Employer" ? "APPLICANT'S APPLICATION" : "MY APPLICATION"}
              </Link>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/Job/Postjob"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/Job/Myjob"} onClick={() => setShow(false)}>
                    VIEW YOUR JOB
                  </Link>
                </li>
              </>
            ) : null}
            <button onClick={handleLogout}>LOG OUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
