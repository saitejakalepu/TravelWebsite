import emailjs from "emailjs-com";
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'
import { Form, Card, Alert } from "react-bootstrap"
import Popup from './Popup'

export default function Feedback() {

    const { currentUser } = useAuth()
    const [open, setOpen] = React.useState(false);
    const[status,setStatus]= React.useState(false);
    

    function sendEmail(e) {
        e.preventDefault();
        setStatus(true);
        setOpen(true);
        
        

    emailjs.sendForm('service_vq18lse', 'template_feedback', e.target, 'user_9Nxm9mXbOkViTWV2xpkRd')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(

        <div>
        {status &&
          <Popup
          title="Feedback Submitted Successfully"
          open={open}
          setOpen={setOpen}
          
        ></Popup>
        }
        
       
   
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">PROVIDE FEEDBACK</h2>
          <Form onSubmit={sendEmail}>

          <div className="col-14 form-group pt-2 mx-auto">
          <Form.Label>Email</Form.Label>
          <input type="email"   required defaultValue={currentUser.email} className="form-control" placeholder="Email Address" name="user_email"/>
          </div>
          
          <div className="col-14 form-group pt-2 mx-auto">
          <Form.Label>Subject</Form.Label>
          <input type="text" className="form-control" placeholder="Subject" name="user_subject"/>
          </div>

          <div className="col-14 form-group pt-2 mx-auto">
          <Form.Label>Message</Form.Label>
          <textarea className="form-control" id="" cols="20" rows="4" placeholder="Your message" name="message"></textarea>
          </div>

              
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="w-40" type="submit">
              Send
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">
            <Button className="w-40" >
              Cancel
            </Button>
            </Link>
            
          </Form>
        </Card.Body>
      </Card>
        </div>
        
    )
}