import { React, useState, useEffect } from 'react'
import Nav from './Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Unique = () => {

  const [post, setPost] = useState({});
  const [commentsArr, setcomments] = useState([]);
  const [formData, setFormData] = useState({comment:''});
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.res.data.result._id;

  const fetchUniquePost = async (id) => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    const data = response.data.post;
    setPost(data);
    setcomments(data.comments);
  }

  const handleComment = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:5000/posts/${id}/comments`,{
        comment: formData.comment,
        commentor: user?.res.data.result.email
      });
       setcomments(response.data.comments);
      
    } catch (error) {
      console.log(error);
    }finally{
      setFormData({comment: ''});
    }
  }

  useEffect(()=>{
    fetchUniquePost(id);
  },[]);

  return (
    <div className='flex flex-col'>
      <Nav/>
      <p className='logo_gradient font-bold text-4xl mt-36 ml-10'>{post.heading}</p>
      <p className=' mt-6 ml-10 mb-12'>{post.body}</p>
      {user?(
        <>
          <label className='font-black text-gray-700 text-xl mt-20 ml-10'>Add a comment</label><br/>
          <textarea required rows='2' className=' p-3 ml-10 comm' type='text' maxLength={350} value={formData.comment} onChange={(e)=>{setFormData({comment:e.target.value})}} placeholder='Add a comment(max 100 characters)...'/>
          <button type='submit' onClick={handleComment} className='comment_btn mb-12'>Add Comment</button>
        </>
      ):(
        <></>
      )}
      {
        commentsArr?.map((comment)=>(
          <div className='flex flex-col mb-3 ml-10 bg-white p-5 comm'>
            <p className='text-gray-600 font-black'>{comment.commentor}</p>
            <p className='text-sm font-semi-bold text-gray-800 '>{comment.comment}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Unique