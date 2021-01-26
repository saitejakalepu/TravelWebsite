import React,{useState,useEffect} from 'react';
import {Link ,useHistory } from 'react-router-dom';
//import {VscFeedback} from 'react-icons/vsc';
import './LogoutBar.css';
import { Button ,Card ,ListGroupItem , ListGroup} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import user from '../images/user.jpg';
import useOutsideAlerter from './outsideAlert';

function LogoutBar() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [button, setButton] = useState(true);
  const [click, setClick] = useState(false);

  const{showOptions, setshowOptions, ref} = useOutsideAlerter(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };

    useEffect(() => {
      showButton();
    }, []);
  
    
  
  window.addEventListener('resize', showButton);

  const history = useHistory()

  async function handleLogout() {
    setError("")
    

    try {
      await logout()
      history.push("/home")
    } catch {
      setError("Failed to log out")
    }
  }

  
    return (
        <>
            <nav className="navbar">
            <div className="navbar-container">
              <div className="navbar-welcome">
              <h2>Welcome</h2> 
              {currentUser.email &&
              <h5>{currentUser.email}</h5> 
              }
              {currentUser.phoneNumber &&
              <h5>{currentUser.phoneNumber}</h5> 
              }
              
            </div>
            <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            {!button && 
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
              <Link
                to='/feedback'
                className='nav-links'
                onClick={closeMobileMenu}>
               FEEDBACK
              </Link>
            </li>
            <li>
              <Link
                to='/UserBookings'
                className='nav-links'
                onClick={closeMobileMenu}>
               My Bookings
              </Link>
            </li>
            <li>
              <Link
                to='/update-profile'
                className='nav-links'
                onClick={closeMobileMenu}>
               Update Profile
              </Link>
            </li>
            
            <li>
              <Link
                to='/home'
                className='nav-links-mobile'
                onClick={handleLogout}>
               LOG OUT
              </Link>
            </li>

            </ul>
          }
            
            {/* <div className="navbar-options">
            <div className="feedback-icon">
              <Link to='/feedback'>
                {button && <h2><VscFeedback/></h2>}
              
              </Link>
            </div>
            <Link to='/UserBookings'>
              {button && <Button buttonStyle='outline'>My Bookings</Button>}
            </Link>
            {currentUser.email && currentUser.displayName===null &&
           <Link to='/update-profile'>
           {button && <Button buttonStyle='outline' >Update Profile</Button>}
           </Link>
            }
           
            <Link to='/home'>
              {button && <Button buttonStyle='outline' onClick={handleLogout}>LOG OUT</Button>}
            </Link>
            
            <div className="profile-picture">
               {currentUser.photoURL && button &&
              <img alt="" src={currentUser.photoURL}/>
               }
               {!currentUser.photoURL && button &&
              <img alt="" src={user}/>
               }
            
             </div>
            </div> */}
            <div className="profile-picture">
              <div className="avatar">
              {currentUser.photoURL && button &&
              <img alt="" src={currentUser.photoURL} onClick={(e)=>setshowOptions(!showOptions)}/>
               }
               {!currentUser.photoURL && button &&
              <img alt="" src={user} onClick={(e)=>setshowOptions(!showOptions)}/>
               }
              </div>
               
             {showOptions && 
             <Card ref={ref} style={{ width: '20rem' , marginTop: 10 , marginLeft :300 ,position:'absolute'}}>
              <Card.Body>
             <Card.Text>
              {currentUser.photoURL && button &&
              <img alt="" src={currentUser.photoURL}/>
               }
               {!currentUser.photoURL && button &&
              <img alt="" src={user}/>
               }

               
              <ul></ul>
              {currentUser.displayName &&
              <h5>{currentUser.displayName}</h5>
              }
              {currentUser.email &&
              <h5>{currentUser.email}</h5> 
              }
              {currentUser.phoneNumber &&
              <h5>{currentUser.phoneNumber}</h5> 
              }

             </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" >
            <ListGroupItem><Link to="/" style={{marginLeft:80 , textDecoration:"none" , color : '007bff'}} onClick={(e)=>setshowOptions(false)}>My DashBoard</Link></ListGroupItem>
            <ListGroupItem ><Link to="UserBookings" style={{marginLeft:'30%', textDecoration:"none",color : '007bff'}}  onClick={(e)=>setshowOptions(false)}>My Bookings</Link></ListGroupItem>
    
            {currentUser.email && currentUser.displayName===null &&
            <ListGroupItem><Link to="update-profile" style={{marginLeft:80 , textDecoration:"none" , color : '007bff'}} onClick={(e)=>setshowOptions(false)}>Update Profile</Link></ListGroupItem>
            }
            <ListGroupItem><Link to="feedback"style={{marginLeft:70 ,textDecoration:"none", color : '007bff'}} onClick={(e)=>setshowOptions(false)}>Provide Feedback</Link></ListGroupItem>
    
           </ListGroup>
          <Card.Body>
  
          <Button variant="primary" style={{marginLeft:100}} onClick={handleLogout}>Sign Out</Button>
 
          </Card.Body>
          <ListGroup className="list-group-flush" >
   
          <ListGroupItem>
          &nbsp;&nbsp;
          <Link to="/">
          <Button variant="light"  onClick={(e)=>setshowOptions(false)}>Privacy Policy</Button>
          </Link>
          &nbsp;&nbsp;
          <Link to="/">
          <Button variant="light" onClick={(e)=>setshowOptions(false)}>Terms of Service</Button>
          </Link>
          </ListGroupItem>
          </ListGroup>
          </Card>
          }
           
           </div>
           </div>
          </nav>
        </>
    )
}

export default LogoutBar
