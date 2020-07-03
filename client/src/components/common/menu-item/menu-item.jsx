import React from 'react'
import './menu-item.scss'
import tempImage from '../../../assets/chicken-club.jpg'

export default function MenuItem() {
  return (
    <div className='menu-item-card'>
      <figure className='image-container'>
        <img src={tempImage} className='image' alt='menu-item' />
      </figure>
      <div className='name'>
        <h3>Chicken Club</h3>
      </div>
      <div className='description'>Grilled chicken, cherry tomatoes, ricotta, fresh parsley, mozzarella, bacon, red onions</div>
      <div className='footer'>
        <div className='counter-container'>
          <button className='counter-button disabled'>-</button>
          <div className='counter'>2</div>
          <button className='counter-button'>+</button>
        </div>
        <div className='price'>$395</div>
      </div>
    </div>
  );
}