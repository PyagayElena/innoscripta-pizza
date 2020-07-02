import React from 'react'
import './side-cart.scss'

export default function SideCart() {
  return (
    <div className='side-cart'>
      <div className='cart-header'>
        <div className='cart-title-container'>
          <h3 className='cart-title'>Cart</h3>
          <h3 className='cart-count'>(2)</h3>
        </div>
        <button className='cart-clear'>Clear</button>
      </div>
      <ul className='cart-list'>
        <li className='cart-item'>
          <div className='cart-item-name-container'>
            <h5 className='name'>Chicken Club</h5>
            <button className='close'>x</button>
          </div>
          <div className='footer'>
            <div className='counter-container'>
              <button className='counter-button disabled'>-</button>
              <div className='counter'>2</div>
              <button className='counter-button'>+</button>
            </div>
            <div className='price'>$395</div>
          </div>
        </li>
        <li className='cart-item'>
          <div className='cart-item-name-container'>
            <h5 className='name'>Chicken Club</h5>
            <button className='close'>x</button>
          </div>
          <div className='footer'>
            <div className='counter-container'>
              <button className='counter-button disabled'>-</button>
              <div className='counter'>2</div>
              <button className='counter-button'>+</button>
            </div>
            <div className='price'>$395</div>
          </div>
        </li>
      </ul>
    </div>
  )
}