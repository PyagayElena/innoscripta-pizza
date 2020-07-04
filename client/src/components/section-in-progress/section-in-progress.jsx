import React from 'react';
import SideCart from '../pizzas/side-cart/side-cart'
import './section-in-progress.scss'

export default function SectionInProgess() {
  const location = window.location.pathname.split('/')[1];
  const sectionImages = {
    salads: require('../../assets/salads.png'),
    desserts: require('../../assets/desserts.jpg'),
    sauces: require('../../assets/sauces.jpg'),
    drinks: require('../../assets/drinks.png')
  }

  return (
    <>
      <h2 className='page-title'>Section in progress...</h2>
      <div className='pizzas-container'>
        <div className='section-in-progress'>
          {!!sectionImages[location] && <figure className='section-in-progress-image-container'>
            <img src={sectionImages[location]} className='image' alt='section-image' />
            </figure>}
        </div>
        <div className='cart-section'>
          <SideCart />
        </div>
      </div>
    </>
  );
}