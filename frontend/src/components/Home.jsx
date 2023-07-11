import React, { useState } from 'react'
import Nav from './Nav';
import Hero from './Hero';
import Layout from './Layout';
import Footer from './Footer';

const Home = () => {
 // const [userisin, setuserisin] = JSON.parse(localStorage.getItem('profile'));
  return (
    <>
        <Nav />
        <Hero/>
        <Layout />
        <Footer/>
    </>
  )
}

export default Home