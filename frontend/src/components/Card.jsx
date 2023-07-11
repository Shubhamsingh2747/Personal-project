import React from 'react';
import { useState } from 'react';
import trash from '../assets/trash-solid.svg';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';

const Card = (props) => {

    const [post,setPost] = useState(props.post);
    const id = props.post._id;

    const user = JSON.parse(localStorage.getItem('profile'));
    const [userId, setuserId] = useState(user?.res.data.result._id);

    const handleLike = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:5000/posts/${id}/likePost`,{params:{ userId }});
        } 
        catch (error) {
            console.log(error);
        }finally{
            window.location.reload()
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete('http://localhost:5000/posts/delete', {
                params: { id }
        })
        setPost(null);
        window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    {post?(
    <div className='flex flex-col glassmorphism layout_width ml-40'>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col text-left ml-4 mb-3'>
                {/*name+email*/}
                <p className='font-black text-lg'>{post.name}</p>
                <p className='text-gray-500 font-semibold'>{post.creatorEmail}</p>
            </div>
                {/* created at */}
                <p className='text-gray-500 font-semibold mt-1'> Created at: {post.createdAt.slice(0, 10)}</p>
        </div>
        {/* body */}
        <div className='flex flex-col ml-4 mb-2'>
            <p className='font-bold text-lg'>{post.heading}</p>
            <p className='text-sm text-gray-800'>
                {post.body.slice(0,350)}
                <a className='tet-md' href={`/:${id}`}> Read More</a>

            </p>
            {/* {userisin?( */}
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-center gap-3'>
                    <button className='fa_styles mt-3 cursor-pointer' onClick={handleLike}><FaHeart/></button>
                    <span className='font-semibold mt-4 text-xl'>{post.likes.length}</span>
                </div>
                {post.creator === userId?(
                    <div className='mt-3 fa_styles mr-9 cursor-pointer' onClick={handleDelete}><img src={trash} alt="like" width="22" height="22"/></div>
                ):(
                    <div className='hidden' onClick={handleDelete}><img src={trash} alt="like" width="22" height="22"/></div>
                )}
            </div>
            {/* ):(<></>)} */}
        </div>
    </div>
    ):(
    <></>
    )}
    </>
  )
}

export default Card

//created at, sort according to time and have a limit of 10, footer