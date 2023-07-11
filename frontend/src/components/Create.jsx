import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Nav from './Nav';

const Create = () => {

  const [formData, setFormData] = useState({name:'', heading:'', body:''});
  const [submitting, setSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem('profile'));
  const token = user?.res.data.token;
  const creator = user?.res.data.result._id;
  const creatorEmail = user?.res.data.result.email;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/posts",{
          name: formData.name,
          creator: creator,
          creatorEmail: creatorEmail,
          heading:formData.heading,
          body: formData.body
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
    } catch (error) {
      console.log(error);
    }finally{
      setSubmitting(false);
      setFormData({name:'', heading:'', body:''});
      navigate('/');
    }
  }

  return (
    <div>
      <Nav/>
      <div className='flex flex-col gap-8 absolute mt-14 ml-60'>
        <p className='create_gradient font-bold text-5xl font-sans text-left mt-20 ml-12 font-inter'>Contribute an article</p>
        <div className='flex flex-col ml-12'>
          <p className='desc'>Share the most interesting historical event you know with the community</p>
          <p className='desc'>Create your article here.</p>
        </div>
        <form className='mt-10 ml-12 mb-40 w-full glassmorphism'onSubmit={handleSubmit}>
          <label className='font-semibold text-gray-700'>Your Name<br/>
            <input required className='mt-2 w-full p-3 mb-5' type='text' value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} placeholder='Your name...'/>
          </label>
          <label className='font-semibold text-gray-700'>Topic<br/>
            <input required className='mt-2 w-full p-3 mb-5' type='text' maxLength={15} value={formData.heading} onChange={(e)=>setFormData({...formData, heading:e.target.value})} placeholder='Topic of your article (max 15 characters)...'/>
          </label>
          <label className='font-semibold text-gray-700'>Body<br/>
            <textarea required rows='10' className='mt-2 w-full p-3 mb-5' type='text' value={formData.body} onChange={(e)=>{setFormData({...formData, body:e.target.value})}} placeholder='Write you article here...'/>
          </label>
          {/* <label className='font-semibold text-gray-700'>Choose a related photo:<br/>
            <input type="file" className='mt-2' name="avatar" accept="image/png, image/jpeg"></input>
          </label> */}
          <button type='submit' className='create_submit black_btn'>
          {
            submitting?`Submitting...`:`Submit`
          }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create