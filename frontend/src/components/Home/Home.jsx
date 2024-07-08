import React, { useContext } from 'react'
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import Herosection from "./Herosection"
import HowItworks from "./HowItworks"
import PopularCategories from "./PopularCategories"
import Popularcompanies from "./Poularcompanies"

 const Home = () => {
    const {isAuthorized} = useContext(Context)

    if(!isAuthorized){
      return <Navigate to={"/login"}/>
    }
  return (
    <section className= "homePage page">
    <Herosection/>
    <HowItworks/>
    <PopularCategories/>
    <Popularcompanies/>
    </section>
  )
}


export default Home