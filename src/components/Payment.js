import React from "react";
import Cards from "react-credit-cards";
import { Button} from "react-bootstrap"
import './Payment.css'
import SupportedCards from './SupportedCards'
import { Link ,Redirect} from "react-router-dom"
import firebase from '../firebase';
import {Card } from "react-bootstrap"
import { Tick } from 'react-crude-animated-tick';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "../util";

import "react-credit-cards/es/styles-compiled.css";
import {Container} from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext"
import Popup from './Popup'

function Display()
{
  const [destination,setDestination]=React.useState();
  const UserEmail = useAuth().currentUser.email;
  const UserMobile = useAuth().currentUser.phoneNumber;
  
  React.useEffect(() => {    
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
    if(User!=="")
    {
    firebase.database().ref(`tempStorage/${User}`).child("tempDestination").once("value", snapshot => {
    //let destinations = snapshot.val();
     setDestination(snapshot.val()); 
   });
    }
   }, []);
  return (
    <div>
        <h5>{destination} Package</h5>

    </div>
)
}
function Checkout() {
console.log("Sending travel details to firebase");

const [counter, setCounter] = React.useState(3);
const UserEmail = useAuth().currentUser.email;
const UserMobile = useAuth().currentUser.phoneNumber;

  React.useEffect(() => {    

    const getDate = getCurrentDate();

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
      User=UserMobile;
    }
    if(User!=="")
    {
      firebase.database().ref("tempStorage").child(User).once("value", snapshot => {
      firebase.database().ref('Booking').child(User).push({Destination: snapshot.val().tempDestination,  BookedOn :  getDate , JourneyDate : snapshot.val().tempDate });
      const removeTemp = firebase.database().ref("tempStorage");
      removeTemp.remove();

        
    });
    }

   }, []);

  

React.useEffect(() => {
  counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
}, [counter]);

  
function getCurrentDate(separator='/'){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
  }


  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "80vh"}}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
         <Tick size={200} />
         <h2>Booking Successfull</h2>
         <br/>
         <h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         Redirecting in {counter}</h3>
         {counter===0 &&
         <Redirect to="UserBookings"/>
         }
         
         </Card>
      </div>
      </Container>
  )
}

export default class Payment extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    valid:"notvalid",
    popUp :"none",
    open : false
    // value : Booking()
    
    
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({target}) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
    
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
    this.checkDatabase();
    
  };

  checkDatabase=()=> {
    console.log(this.state.number);
  
   for(var i=1;i<=2;i++)
  
   {
  
  
    var numref = firebase.database().ref().child("Cards/"+i).once("value", snapshot => {
      // var expiryref = numref.orderByChild('expiry').equalTo(this.state.expiry);
      // var cvcref = expiryref.orderByChild('cvc').equalTo(this.state.cvc)
      
      const DatabaseCardNum= snapshot.val().number;
      const DatabaseCardExpiry= snapshot.val().expiry;
      const DatabaseCardCvc= snapshot.val().cvc;
       
        const num = snapshot.val();
        console.log(num);
    
        console.log(DatabaseCardNum);
        console.log(DatabaseCardExpiry);
        console.log(DatabaseCardCvc);
    
    
        if (DatabaseCardNum==this.state.number &&   DatabaseCardExpiry==this.state.expiry &&  DatabaseCardCvc==this.state.cvc ){
          console.log("exists!");
          this.setState({valid:"valid"})
          console.log(this.state.valid);
          
          } 
          
        else {
         
          console.log(" not exists");
          this.setState({popUp : "show"});
          this.setState({open : true});
          
        }
        });
      
   }
  }
  
  

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
     
    
         <div key="Payment" style = {{height: 0}}>
           {this.state.popUp=="show" && this.state.valid === "notvalid" &&
            <Popup
            title="Invalid Card Details"
            text="Please check the details and Try again"
            open={this.state.open}
            setOpen={(e)=>this.setState({open: !this.state.open})}
            
          ></Popup>
             
           }
           
           {this.state.valid ==="valid" &&
          <> 
           <Checkout/>
</>

}
      {this.state.valid === "notvalid" &&
      <div>
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh"}}>
      <div className="w-100" style={{ maxWidth: "500px" }}>
<div className="App-payment">
<Card>
<Card.Body>
<Display/>

<h2 className="text-center mb-4">Card Details</h2>


  <Cards
    number={number}
    name={name}
    expiry={expiry}
    cvc={cvc}
    focused={focused}
    callback={this.handleCallback}
  />



  <ul></ul>
  {/* {this.state.value} */}
          
    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
    <div className="form-group">
      <input
        type="tel"
        name="number"
        className="form-control"
        placeholder="Card Number"
        pattern="[\d| ]{16,22}"
        required
        onChange={this.handleInputChange}
        onFocus={this.handleInputFocus}
      />
      <small>E.g.: 49..., 51..., 36..., 37...</small>
    </div>
    <div className="form-group">
      <input
        type="text"
        name="name"
        className="form-control"
        placeholder="Name"
        required
        onChange={this.handleInputChange}
        onFocus={this.handleInputFocus}
      />
    </div>
    <div className="row">
      <div className="col-6">
        <input
          type="tel"
          name="expiry"
          className="form-control"
          placeholder="Valid Thru"
          pattern="\d\d/\d\d"
          required
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
        />
      </div>
      <div className="col-6">
        <input
          type="tel"
          name="cvc"
          className="form-control"
          placeholder="CVC"
          pattern="\d{3,4}"
          required
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
        />
      </div>
    </div>
    {/* <input type="hidden" name="issuer" value={issuer} /> */}
    
    <ul>
    <div className="form-actions" style={{marginLeft : 120}}>
      <Button type="submit">PAY</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/details">
     <Button >
      Cancel
    </Button>
    </Link>
    </div>
    </ul>
    
    
    
  <small>Scroll Down to see supported cards......</small>
  </form>

  {/* {formData && (
    <div className="App-highlight">
      {formatFormData(formData).map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </div>
  )} */}

      </Card.Body>
  </Card>
</div>
</div>

</Container>
<SupportedCards/>
</div>

      }
            
     
    </div>
    );
  }
}
