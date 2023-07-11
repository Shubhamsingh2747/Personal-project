import React from 'react'
import hero from '../assets/hero2.jpg';

const Hero = () => {
  return (
    <div className='z-0'>
      <div><img className='hero_background' src={hero}/></div>
      <div>
        <p className='hero_text'>Enjoy articles about some of the most interesting and fascinating events in history</p>
      </div>
    </div>
  )
}

export default Hero