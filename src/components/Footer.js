import emailjs from "emailjs-com";
import React,{useState, useEffect} from 'react';
import firebase from '../firebase'
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Popup from './Popup'

function Footer() {

const [Email, setEmail] = useState("");
const [status , setStatus]= useState(false);
const[ form, setForm] = useState("");
const [userExists , setuserExists]= useState(false);
const [newUser , setnewUser]= useState(false);
const [open, setOpen] = useState(false);


const addLocation = data => firebase.database().ref().child('Subscribers').push(data, response => response);

function handleText(e)
{
        setEmail(e.target.value);
        
}

function sendEmail(e) {

  setForm(e.target);
  

  if(status)
  {
    setStatus(false);
  }
  else
  setStatus(true);
 
  e.preventDefault();

}

    useEffect(()=>{

      if(form && Email!=="")
      {
        firebase.database().ref().child("Subscribers").orderByChild('email').equalTo(Email).once("value", snapshot => {
           
          const userEmail = snapshot.val();
          //console.log(userEmail);
  
          if (userEmail){
            console.log("user exists!");
            setuserExists(true);
            } 
          else {
            addLocation({email: Email});
            console.log(" new user found!");
            //console.log(e.target);
            setnewUser(true);
          
        console.log("mail sent");
          emailjs.sendForm('service_vq18lse', 'template_subscribe', form, 'user_9Nxm9mXbOkViTWV2xpkRd')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          }
          });
      }

      setnewUser(false);
      setuserExists(false);
    },[status]
    )
 


  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form onSubmit={sendEmail}>
            <input
              className='footer-input'
              name="user_email"
              type='email'
              placeholder='Your Email'
              onChange={handleText}
            />
            <Button type="submit" buttonStyle='outline' onClick={()=>setOpen(true)}>Subscribe</Button>
          </form>
          {newUser &&
          <Popup
          title="User Subscription successfull"
          open={open}
          setOpen={setOpen}
          
        ></Popup>
        

          }
          {userExists &&
          <Popup
          title="User already subscribed"
          open={open}
          setOpen={setOpen}
          
        ></Popup>
        

          }
          
        </div>

      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>About Us</h3>
            <Link to='/'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h3>Contact Us</h3>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>Videos</h3>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div class='footer-link-items'>
            <h3>Social Media</h3>
            <Link to='/services'>Instagram</Link>
            <Link to='/services'>Facebook</Link>
            <Link to='/services'>Youtube</Link>
            <Link to='/services'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              <label> Holiday Planner</label>
              
            <i class="fas fa-plane-departure"></i>
            </Link>
          </div>
          <small class='website-rights'>Holiday Planners © 2020</small>
          <div class='social-icons'>
           
            <a href="https://www.facebook.com/"
            class='social-icon-link facebook'
            aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </a>

            <a href="https://www.instagram.com/"
            class='social-icon-link instagram'
              target='_blank'
              aria-label='Instagram'
            ><i class='fab fa-instagram' />
            </a>

            <a href="https://www.youtube.com/"
            class='social-icon-link youtube'
              target='_blank'
              aria-label='Youtube'
              
            >
               <i class='fab fa-youtube' />
            </a>

          <a href="https://twitter.com/"
            class='social-icon-link twitter'
              target='_blank'
              aria-label='Twitter'
              
            >
               <i class='fab fa-twitter' />
            
            </a>

            <a href="https://www.linkedin.com/in/saitejakalepu/"
            class='social-icon-link linkedin'
              target='_blank'
              aria-label='Linkedin'
              
            >
               
               <i class='fab fa-linkedin' />
            </a>


          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
