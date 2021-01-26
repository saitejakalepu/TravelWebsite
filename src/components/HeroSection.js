import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import {Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/*<video src='/videos/video-1.mp4' autoPlay loop muted />*/}
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>

      <div className='hero-btns'>
        <Link to='/signup'><Button
          className='btns'
          buttonStyle='outline'
          buttonSize='large'
        >
        GET STARTED
        </Button></Link>
        <Link to='/trailer'>
        <Button
          className='btns'
          buttonStyle='primary'
          buttonSize='large'
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
