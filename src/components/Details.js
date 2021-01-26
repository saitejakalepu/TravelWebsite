import React, { useState, Fragment } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css";
import firebase from '../firebase';
import { Form, Button, Card ,Col} from "react-bootstrap"

export default function Details() {

  const [checkbox, setCheckbox] = useState(true);
  const [navigate, setNavigate] = useState("none");
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
     setDestination(snapshot.val()); 
   });
    }
   }, [UserEmail , UserMobile]);

  const [inputFields, setInputFields] = useState([
    { Name: "", Age: "", Category:"adult"}
  ]);
  const [count, setCounter] = useState(1);

  function handleAddFields()
  {
    const values = [...inputFields];
    values.push({ Name: "", Age: "", Category:"adult" });
    
    setCounter(count+1);

    setInputFields(values);
  };

  function handleRemoveFields(index)
  {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setCounter(count-1);
  };

  function handleInputChange(index, event){
    const values = [...inputFields];
    if (event.target.name === "Name") {
      
      if(event.target.value.length > 30)
      {
        alert("Name should not be more than 30 letters")
      }
      else
      {
        values[index].Name = event.target.value;
      }
      
    }
    else if(event.target.name === "Category")
    {
      values[index].Category = event.target.value;
    }
    
     else
    {
      if(event.target.value<100)
      {
        values[index].Age = event.target.value;
      }
      else
      {
        alert("Invalid age , age should be below 100 or should be a value")
      }
      
    }

    setInputFields(values);
  };

  function handleSubmit(e){
    
    e.preventDefault();
    console.log("inputFields", inputFields);
    setNavigate("yes");
  };

  function handleCheckBox(e)
  {
    setCheckbox(!checkbox);
    if(checkbox)
    {
      alert("please accept terms and conditions");
    }
  }
  return (
    <div style={{paddingTop :'100px', height:0}}>
      {navigate==="yes" &&
      <Redirect to='/payment' />
      }
      {navigate==="none" &&
    <Card style={{width :'700px', marginLeft :'400px' , minHeight :'400px'}}>
      <Card.Body>
      <h5 className="text-center mb-4" style={{marginLeft:300, width :500}}>{destination} PACKAGE</h5>
      <h2 >Provide your Details</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Row className="align-items-center" style={{width : "600px", paddingLeft :"30px"}}>
      {inputFields.map((inputField, index) => (
      <Fragment key={`${inputField}~${index}`}>
      <Col xs="auto" className="my-1">
      <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
        Child / Adult
      </Form.Label>
      <Form.Control
        as="select"
        className="mb-2"
        custom
        id="Category"
        name="Category"
        required
        value={inputField.Category} 
        onChange={(event) => handleInputChange(index, event)}
      >
        <option value="adult" selected>ADULT</option>
        <option value="child">CHILD</option>
      </Form.Control>
    </Col>
    <Col xs="auto">
      <Form.Label htmlFor="inlineFormInput" srOnly>
        Name
      </Form.Label>
      <Form.Control
        type="text"
        className="mb-2"
        id="Name"
        name="Name"
        placeholder="Name"
        value={inputField.Name}
        onChange={(event) => handleInputChange(index, event)}
        required
      />
    </Col>
    <Col xs="2">
      <Form.Label htmlFor="inlineFormInput" srOnly>
        Age
      </Form.Label>
      <Form.Control
        type="text"
        className="mb-2"
        id="Age"
        name="Age"
        value={inputField.Age}
        onChange={(event) => handleInputChange(index, event)}
        placeholder="Age"
        required
      />       
    </Col>
    <div className="form-group ">
                
                <button
                  className="btn btn-primary mr-2"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
                
                <button
                  className="btn btn-primary mr-2"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
              </div>
    </Fragment>
          ))}
  </Form.Row>
  <Form.Row>
  
  <Col xs="auto" style={{paddingTop:250 ,paddingLeft :"30px"}}>
      <Form.Check
        type="checkbox"
        id="autoSizingCheck"
        className="mb-2"
        label="I Agree Terms and conditions"
        checked={checkbox}
        onChange={handleCheckBox}
      />
    </Col>
   
    <Col xs="auto" style={{ paddingTop:300}}>
      <Button type="submit" onSubmit={handleSubmit} className="mb-2">
        Submit
      </Button>
    </Col>
    
    <Link to='/booking'>
    <Button style={{ marginTop:300}} className="mb-2">Cancel</Button></Link>
    
    </Form.Row>
    </Form>
      </Card.Body>
    </Card>
}
    
    </div>
      
  );
};



