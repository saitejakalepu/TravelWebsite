import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { useAuth } from "../contexts/AuthContext"
import Bali from '../images/Bali.jpg'


function Cards() {
  const { currentUser } = useAuth();
  return (
    
    <>
      {!currentUser && 
      <div className="cards">
       <h1>Check out these EPIC Destinations!</h1>
       <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src={Bali}
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
            
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/services'
            />
          </ul>
        </div>
      </div>
       </div>
      }
      {currentUser && 
      <div className="booking">
       <h1>Pick your Travel Destination</h1>
       <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
          <CardItem
              src='images/img-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/payment'
            />
            <CardItem
              src='images/img-10.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/payment'
            />
          
            <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/payment'
            />
          </ul>
          <ul  className='cards__items'>
          <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/payment'
            />
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/payment'
            />
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/payment'
            />
            
          </ul>
        </div>
      </div>
       </div>
      }
    </>
  );
}

export default Cards;
