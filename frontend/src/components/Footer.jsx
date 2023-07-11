import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col bg-slate-800 gap-6'>
        <p className='text-white font-bold text-center mt-8'>Connect with me: </p>
        <div className='flex justify-center gap-7'>
            <a href="https://www.linkedin.com/in/shubham-singh27/" class="fa fa-linkedin fa_l"></a>
            <a href="https://www.instagram.com/shubham_singh27/" class="fa fa-instagram fa_i"></a>
            <a href="#" class="fa fa-facebook fa_l"></a>
            <a href="https://www.reddit.com/" class="fa fa-reddit fa_r"></a>
        </div>
        <p className='text-white font-semibold text-center mt-6 mb-8'>&#169; copyright 2023-2035 </p>
    </div>
  )
}

export default Footer