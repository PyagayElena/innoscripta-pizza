import React from 'react';
import './pizzas.scss'
import MenuItem from '../common/menu-item/menu-item'
import SideCart from './side-cart/side-cart'

export default function Pizzas() {
  return (
    <>
      <h2 className='page-title'>Pizzas</h2>
      <div className='pizzas-container'>
        <div className='menu-section'>
          <ul className='menu-list'>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
            <li className='menu-item'>
              <MenuItem />
            </li>
          </ul>
        </div>
        <div className='cart-section'>
          <SideCart />
        </div>
      </div>
    </>
  );
}