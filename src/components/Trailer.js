import React from 'react'
import ReactPlayer from 'react-player'
import '../App.css'


function Trailer() {
    return (
      <>
      
        <div className='player-wrapper'>
        <ReactPlayer
          url='https://www.youtube.com/watch?v=OHAWwaYu2H0'
          className='react-player'
          controls
          width='80%'
          height='80%'
        />
      </div>
      </>


      
    )
}

export default Trailer
