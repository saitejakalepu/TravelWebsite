import React, {Component} from 'react'
import {Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import {Button} from './Button'
import {Container} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import BookingCard from './BookingCard'
import firebase from '../firebase';
import ReactLoading from 'react-loading';
import Popup from './Popup'
import './UserBookings.css';



export default function UserBookings() {

  const [display,Setdisplay]= React.useState(false);
  const [destination,setDestination]=React.useState([]);
  const [loading,setLoading]=React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(3);

  const { currentUser } = useAuth();

  if(currentUser)
  {
    var UserEmail = currentUser.email;
    var UserMobile = currentUser.phoneNumber;
  }

  console.log(destination.length);
  
  

   function getCurrentDate(separator='/'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }


    React.useEffect(() => {   
      
      let val=""

      if(UserEmail)
      {
        var Email = UserEmail.replace(/\./g,"",);
        Email = Email.replace(/\#/g,"",); 
        Email = Email.replace(/\$/g,"",); 

        val = Email;
      }

      if(UserMobile)
      {
         val = UserMobile;
      }

      if(val!=="")
      {
        const bookingref = firebase.database().ref('Booking').child(val).once("value", snapshot => {
          let destinations = snapshot.val();
          let newState = [];
          for (let key in destinations) {
            newState.push({
              id: key,
              destination: destinations[key].Destination,
              date: destinations[key].BookedOn,
              journeyDate : destinations[key].JourneyDate
              
            });
      
            
          }
          setDestination(newState); 
    
            });
      }
       
     }, []);


     function removeItem(destinationId) {
       if(UserEmail)
       {
        var Email = UserEmail.replace(/\./g,"",);
        Email = Email.replace(/\#/g,"",); 
        Email = Email.replace(/\$/g,"",); 
      const bookedRef = firebase.database().ref(`Booking/${Email}`).child(`${destinationId}`)
      bookedRef.remove();
     
       }
       if(UserMobile)
       {
        const bookedRef = firebase.database().ref(`Booking/${UserMobile}`).child(`${destinationId}`)
      bookedRef.remove();
      
       }
       setOpen(true);
       window.location.reload(false);
    }

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);


    
    return (
      
      
        <div style={{ height: 0, width: "1000px", paddingTop:50 , marginLeft:220 }}>
          {
            !currentUser &&
            <>
            <h1>Please Login to access Booking page</h1>
            <h1>
            <Link to="/login">Click here to Login</Link>
            </h1>
            
            </>
          }
          {!destination.length && counter==="0" && currentUser &&
          <>
          <Card style={{borderRadius:10}}>
          <Card.Body>
          <h2>No Bookings Found </h2>
          </Card.Body>
          </Card>
          <div style={{margin:100, paddingLeft:170}}>
        <Link to='/booking'><Button
          className='btns'
          buttonStyle='primary'
          buttonSize='large'
        >
        BOOK NOW 
        </Button></Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/'>
        <Button
          className='btns'
          buttonStyle='primary'
          buttonSize='large'
        >
          Return to Dashboard
        </Button>
        </Link>
        </div>
    </>

          }
          {!destination.length &&  counter!=="0" && currentUser &&
          <div style={{marginLeft :"400px", marginTop:"20%"}}>
          <ReactLoading type="spinningBubbles" color="white" height={170} width={170} />
          </div>
          }  
          {destination.length > 4 &&
          <h5 style={{marginLeft :50}}>Scroll Down to see more Bookings</h5>
          }     


  <div className="scroller">
  {destination && currentUser &&
          <>
        
        <ul>
      {destination.map(destination => {
        return (
          
          <BookingCard  
          key={destination.id}
          src={destination.destination}
          name={destination.destination}
          JourneyDate={destination.journeyDate}
          BookedOn={destination.date}
          onClick={() => removeItem(destination.id)}
          
          />   

        )
        
      })}
    </ul>
    
    <Popup
    title="Cancellation successfull"
    open={open}
    setOpen={setOpen}
    text="Refreshing page , Please wait....."
    textOnly={true}
    >
    </Popup>
          </>    
          
          }
         

        </div>

        </div>
        
    )
}


