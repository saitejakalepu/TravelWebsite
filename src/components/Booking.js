import React,{useState} from 'react'
import { Link } from "react-router-dom"
import {Button} from './Button'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Row } from 'react-bootstrap';
import Bali from '../images/Bali.jpg'
import Goa from '../images/Goa.jpg'
import Maldives from '../images/Maldives.jpg'
import firebase from '../firebase';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ImageCard from './ImageCard'
import { useAuth } from "../contexts/AuthContext"

export default function Booking() {
    

    const [date, setDate] = useState(new Date());
    
    const UserEmail = useAuth().currentUser.email;
    const UserMobile = useAuth().currentUser.phoneNumber;
  
    const present = new Date();
    const onChange= date =>{
        setDate(date)
    };

 
let separator='/';
let Selecteddate = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
  
let JourneyDate= `${Selecteddate}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`;
  
 async function handleClick(e)
{
  let User="";
  if(UserEmail)
  {
  var Email = UserEmail.replace(/\./g,"",);
  Email = Email.replace(/\#/g,"",); 
  Email = Email.replace(/\$/g,"",); 
  User= Email;
  }
  if(UserMobile)
  {
    User= UserMobile;
  }
  
 const addLocation = firebase.database().ref('tempStorage').child(User).set({tempDestination : e.target.innerText , tempDate : JourneyDate});

}

    return (
        <div style = {{ height : 0, display : "flex" ,flexDirection : Row}}>
        <div>
            <div style = {{marginLeft : 50 , paddingTop : 50 ,}}>
            <Link to='/'>
            <Button buttonStyle='primary' buttonSize='large'><i className='fa fa-arrow-left' />&nbsp;&nbsp;&nbsp;Return to Dashboard</Button>
            </Link>  
            </div>
            <div style ={{margin : 50 ,maxWidth :300}} >
                <h1>Select Date</h1>
            <Calendar selectRange={false} onChange={onChange} value={date}/>
            </div>
        </div>
        {date > present &&
      <div style={{marginTop:50}}    className="booking" >
       <h1>Pick your Travel Destination</h1>
       <div className='cards__container'>
        <div className='cards__wrapper' >
          <ul className='cards__items' >
          <ImageCard
          src={Bali}
          name="Bali"
          path="/details"
          onClick={handleClick}
          />         
          <ImageCard
          src={Goa}
          name="Goa"
          path="/details"
          onClick={handleClick}
          />
          <ImageCard
          src={Maldives}
          name="Maldives"
          path="/details"
          onClick={handleClick}
          />
          </ul>
          <ul  className='cards__items'>
          <ImageCard
          src={Bali}
          name="Bali"
          path="/details"
          onClick={handleClick}
          />         
          <ImageCard
          src={Goa}
          name="Goa"
          path="/details"
          onClick={handleClick}
          />
          <ImageCard
          src={Maldives}
          name="Maldives"
          path="/details"
          onClick={handleClick}
          />  
          </ul>
        </div>
      </div>
       </div>
}
        </div>
    )
}






