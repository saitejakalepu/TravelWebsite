import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Services from './components/pages/Services'
import Products from './components/pages/Products'
import Trailer from './components/Trailer'
import {Container} from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from "./AuthComponents/Dashboard"
import Login from "./AuthComponents/Login"
import PrivateRoute from "./AuthComponents/PrivateRoute"
import ForgotPassword from "./AuthComponents/ForgotPassword"
import UpdateProfile from "./AuthComponents/UpdateProfile"
import Navbarcheck from './AuthComponents/NavbarCheck'
import Signup from "./AuthComponents/Signup"
import Feedback from './components/Feedback'
import Booking from './components/Booking'
import Payment from './components/Payment'
import Details from './components/Details'
import UserBookings from './components/UserBookings'

function App() {

  return (
   
    <>
    <Router>
        <AuthProvider>
        <Navbarcheck/>
            <Switch>
              <Route exact path='/home'component={Home} />
              <Route path='/services' strict component={Services} />
              <Route path='/products' strict component={Products} />
              
              
              <div className="main">
              <Route path="/trailer" component={Trailer} />
              <PrivateRoute path="/payment" component={Payment} />
              <PrivateRoute path="/details" component={Details} />
              <PrivateRoute path="/UserBookings" component={UserBookings} />
              
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path='/booking' strict component={Booking} />
              <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "80vh"}}>
              <div className="w-100" style={{ maxWidth: "400px" }}>
              
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              
              
              <Route path="/login" component={Login} />
              <PrivateRoute path="/feedback" component={Feedback} />
              <Route path="/forgot-password" component={ForgotPassword} />
              </div>
              </Container>
              </div>
            </Switch>
          </AuthProvider>
      </Router>
   
      
    </>
  );
}


          

export default App;
