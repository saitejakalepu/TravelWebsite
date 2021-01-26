import React from 'react'
import { Button } from "react-bootstrap"
import Bali from '../images/Bali.jpg'
import Goa from '../images/Goa.jpg'
import Maldives from '../images/Maldives.jpg'
import './ImageCard.css';

function BookingCard(props) {

const[image,setImage]=React.useState();

    const today = new Date();
    const JourneyDate=String(props.JourneyDate);
    const separator='/'
    const format= JourneyDate.split('/');
    const date= format[0];
    const month= format[1];
    const year= format[2];
    const changedFormat = `${month}${separator}${date}${separator}${year}`

    React.useEffect(() => {
    
    if(props.src === "Maldives")
    {
        setImage(Maldives);
    }
    else if(props.src === "Goa")
    {
        setImage(Goa);
    }
    else
    {
        setImage(Bali);
    }
    
  }, [props.src]);


    return (
        
        <div className="myBooking_card" >
           <img className="myBooking_img" src={image} alt="destination"/>
            <div className="myBooking_text">
            {props.name}
            </div>
            <div className="myBooking_JourneyDate">
            Journey Date : {props.JourneyDate}
            </div>
            
            <div className="User_Cancel_Booking">
                
                {new Date(changedFormat) > today &&
                    <Button className="w-40" onClick={props.onClick}>Cancel Booking</Button>
                }
                {new Date(changedFormat) < today &&
                    <Button className="w-40" disabled onClick={props.onClick}>Cancel Booking</Button>
                }
            
            <h5>Package Booked On : {props.BookedOn}</h5>
            </div>
        </div>
    )
}

export default BookingCard

