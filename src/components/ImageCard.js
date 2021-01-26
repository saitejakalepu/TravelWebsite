import React from 'react'
import { Link } from 'react-router-dom';
import './ImageCard.css'


function ImageCard(props) {
    

    return (
        <div className="Card_Booking"  onClick={props.onClick}>
            <Link to={props.path}>
           <img className="img_Booking" src={props.src}/>
            <div class="overlay">
            <div class="text_hover">Book Now</div>
            </div>
            <div class="overlay_text">
            <div class="text">{props.name}</div>
            </div>
            </Link>
        </div>
    )
}

export default ImageCard

