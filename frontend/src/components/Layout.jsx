import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card';
import Input from './Input';

const Layout = () => {

  const [posts,setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:5000/posts");
    const data = response.data.posts;
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='custom_margin flex flex-col gap-16'>
      <Input/>
      <p className='font-extrabold text-gray-600 text-4xl ml-40 mt-20'>Articles this Week</p>
      {posts.map((post)=>(
        <Card key={post._id} post={post}/>
      ))}
    </div>
  )
}

export default Layout