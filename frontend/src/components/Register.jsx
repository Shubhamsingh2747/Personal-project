import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [formData, setFormData] = useState({email:'', password:'', Cpassword:''});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/user/signup",{
        email: formData.email,
        password: formData.password,
        Cpassword: formData.Cpassword
      })
      console.log(res);
      localStorage.setItem('profile', JSON.stringify({res}));
    } catch (error) {
      console.log(error);
    }finally{
      setSubmitting(false);
      setFormData({email:'', password:'', Cpassword:''});
      navigate("/");
    }
  }

  const handleClick = () => {
    navigate('/signin');
  }

  return (
    <div>
      <Nav/>
      <div className='flex flex-col gap-8 absolute mt-14 ml-60'>
        <p className='create_gradient font-bold text-5xl font-sans text-left mt-20 ml-12 font-inter'>Contribute an article</p>
        <div className='flex flex-col ml-12'>
          <p className='desc'>Register to Contribute an article.</p>
        </div>
        <form className='mt-10 ml-12 mb-40 w-full glassmorphism'onSubmit={handleSubmit}>
          <lablel className='font-semibold text-gray-700'>Your Email<br/>
            <input required className='mt-2 w-full p-3 mb-5' type='email' value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} placeholder='Your email...'/>
          </lablel>
          <lablel className='font-semibold text-gray-700'>password<br/>
            <input required className='mt-2 w-full p-3 mb-5' type='password' value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})} placeholder='Password...'/>
          </lablel>
          <lablel className='font-semibold text-gray-700'>Confirm password<br/>
            <input required className='mt-2 w-full p-3 mb-5' type='password' value={formData.Cpassword} onChange={(e)=>setFormData({...formData, Cpassword:e.target.value})} placeholder='Enter password again...'/>
          </lablel>
          <button type='button' onClick={handleClick} className='create_submit2 white_btn_auth'>Already have an account? SignIn</button>
          <button type='submit' className='create_submit black_btn'>
          {
            submitting?`Submitting...`:`Submit`
          }
          </button>
        </form>
      </div>
      {/* <div className='absolute mr-10'><img src={pillar} alt='pillar'/></div> */}
    </div>
  )
}

export default Register