import React from 'react';
import './section-in-progress.scss';

export default function SectionInProgess() {
  const location = window.location.pathname.split('/')[1];
  const sectionImages = {
    salads: require('../../assets/salads.png'),
    desserts: require('../../assets/desserts.png'),
    sauces: require('../../assets/sauces.png'),
    drinks: require('../../assets/drinks.png')
  }

  return (
    <>
      <h2 className='page-title'>Section in progress...</h2>
      <div className='section-in-progress'>
        {!!sectionImages[location] && <figure className='section-in-progress-image-container'>
          <img src={sectionImages[location]} className='image' alt='section' />
        </figure>}
      </div>
    </>
  );
}