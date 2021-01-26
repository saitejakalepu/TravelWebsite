import React from "react"
import { Button } from '../components/Button'
import {Link } from 'react-router-dom';
import '../App.css'

export default function Dashboard() {
  
  return (
    <div className="dashboard" style={{height : 0}}>
        <h1>BOOKINGS OPEN </h1>
        <div className ="dashboard_button" >
        <Link to='/booking'>
        <Button
          className='btns'
          buttonStyle='primary'
          buttonSize='large'
        >
          Click here to Check out our Holiday Packages ! &nbsp;&nbsp; <i className='fa fa-bus' />&nbsp;&nbsp;<i className='fa fa-plane' />
          &nbsp;&nbsp;<i className='fa fa-ship' />&nbsp;&nbsp;<i className='fa fa-car' />
        </Button>
        </Link>
        </div>
    </div>
  )
}
