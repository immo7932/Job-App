import React, {useEffect, useContext} from 'react';
import "./App.css"
import axios from 'axios'
import { Context } from './main';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import JobDetails from './components/Job/JobDetail'
import Postjob from './components/Job/Postjob'
import Myjob from './components/Job/Myjob'
import Jobs from './components/Job/Jobs'
import Notfound from './components/Notfound/Notfound'
import Application from './components/Application/Application'
import Myapplication from './components/Application/Myapplication'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import { Toaster } from 'react-hot-toast';

export const App = () => {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context)

  useEffect(()=>{
    const fetchUser = async()=>{
          try{
              const response = await axios.get("", {withCredentials : true})
              setUser(response.data.user);
              setIsAuthorized(true)
          }
          catch (error){
            setIsAuthorized(false)
          }
    }

    fetchUser();
  }, [isAuthorized])


  return (
   <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/regidter' element = {<Register/>}/>
        <Route path='/' element = {<Home/>}/>
        <Route path='/Job/Postjob' element = {<Postjob/>}/>
        <Route path='/Job/Myjob' element = {<Myjob/>}/>
        <Route path='/Job/Jobs/:id' element = {<Jobs/>}/>
        <Route path='/Job/JobDetails' element = {<JobDetails/>}/>
        <Route path='*' element = {<Notfound/>}/>
        <Route path='/Application/:id' element = {<Application/>}/>
        <Route path='/Application/my' element = {<Myapplication/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
      
    </Router>
   </>
  )
}
