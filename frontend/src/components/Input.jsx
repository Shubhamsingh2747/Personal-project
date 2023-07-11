import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Input = () => {

    const [formData, setFormData] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get('http://localhost:5000/posts/search');
        //console.log(response);
      } catch (error) {
        console.log(error);
      }finally{
        setFormData('');
      }
    }
   
  return (
    <div className='flex flex-row gap-3 justify-center'>
        <input required className='p-3 mb-5 bg-zinc-300 w-3/5 text-black rounded-lg' type='text' value={formData} onChange={(e)=>setFormData(e.target.value)} placeholder='Search an article...'/>
        <button utton type='submit' onClick={handleSubmit} className='black_btn_search mb-5'>Search</button>
      </div>
  )
}

export default Input