import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Nav = () => {

  const [isSignedIn, setisSignIn] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();

  const navigateCreate = () => {
    navigate('/create');
  };

  const navigateSignIn = () => {
    navigate('/signin');
  }

  const navigateRegister = () => {
    navigate('/register');
  }

  const handleSignOut = () => {
    localStorage.clear();
    setisSignIn(null);
    window.location.reload();
  }

  useEffect(()=>{
    const token = isSignedIn?.res.data.token;
  },[]);


  return (
    <nav className='flex z-10 justify-around w-full items-center flex-wrap bg-neutral-200 bg-slate-800 drop-shadow-lg p-4 fixed'>

      <div className='flex gap-4'>
        <img src={logo} alt="logo" height="65" width="65"/>
        <p className=' text-slate-50 font-bold text-4xl font-sans text-center mt-2'>Imperator</p>
      </div>

      <div>
      {isSignedIn?(
        <>
          <div className='flex flex-wrap gap-7 items-center'>
            <button type='button' onClick={navigateCreate} className='green_btn'>Create</button>
            <button onClick={handleSignOut} type='button' className='red_btn'>Sign Out</button>
            <div className='flex flex-col'>
              <p className='font-black text-white text-lg'>Welcome</p>
              <p className='text-white font-semibold'>{isSignedIn?.res.data.result.email}</p>
            </div>
          </div>
        </>
      ):(
        <div className='flex gap-7 items-center'>
          <button type='button' className='green_btn' onClick={navigateSignIn}>Sign In</button>
          <button type='button' className='blue_btn' onClick={navigateRegister}>Register</button>
        </div>
      )}
      </div>

    </nav>
  )
}

export default Nav;