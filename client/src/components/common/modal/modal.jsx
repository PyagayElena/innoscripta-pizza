import React from 'react';
import './modal.scss';

export default function Modal ({ handleClose, show, children }) {
  return (
    <div className={`modal ${show && 'show'}`}>
      <section className="modal-container">
        <div className='top'>
          <button className='close' onClick={handleClose}>x</button>
        </div>
        {children}
      </section>
    </div>
  );
};