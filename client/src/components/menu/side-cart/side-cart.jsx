import React from 'react';
import { useHistory } from 'react-router-dom';
import './side-cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { add, clear, remove, removeAll, selectorCart } from '../../../store/cart-slice';
import NumberToPrice from '../../../helpers/price';
import { selectorUser } from '../../../store/user-slice';

export default function SideCart() {

  const cart = useSelector(selectorCart);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <div className='side-cart'>
      <div className='cart-header'>
        <div className='cart-title-container'>
          <h3 className='cart-title'>Cart</h3>
          {!!cart.totalCount &&
            <h3 className='cart-count'>
              { `(${cart.totalCount})` }
            </h3>}
        </div>
        {!!cart.totalCount &&
          <button className='cart-clear'
                  onClick={() => dispatch(clear())}>
            Clear
          </button>}
      </div>

      {!cart.totalCount ?
        <div className='empty-cart-container'>
          <figure className='image-container'>
            <img src={require('../../../assets/empty-cart.jpg')} className='image' alt='empty-cart' />
          </figure>
          <div className='notes'>Your cart is empty. Add items from the menu.</div>
        </div> :

        <>
          <ul className='cart-list'>
            { Object.values(cart.products).map(item =>
              <li className='cart-item' key={item._id}>
                <div className='cart-item-details-container'>
                  <div className='cart-item-details'>
                    <h5 className='name'>{item.title}</h5>
                    <div className='type'>{item.type}</div>
                  </div>
                  <button className='close'
                          onClick={() => dispatch(removeAll(item))}>
                    x
                  </button>
                </div>
                <div className='footer'>
                  <div className='counter-container'>
                    <button className='counter-button'
                            onClick={() => dispatch(remove(item))}>
                      -
                    </button>
                    <div className='counter'>{item.count}</div>
                    <button className='counter-button'
                            onClick={() => dispatch(add(item))}>
                      +
                    </button>
                  </div>
                  <div className='price'>{NumberToPrice(item.price, user.currency)}</div>
                </div>
              </li> )
            }
          </ul>
          <div className='total-container'>
            <div className='description-container'>
              <div className='title'>Total:</div>
              <div className='description'>
                {`(including delivery costs: ${NumberToPrice(5, user.currency)})`}
              </div>
            </div>
            <div className='total-value'>{NumberToPrice(cart.totalCost, user.currency)}</div>
          </div>
          <div className='order-button-container'>
            <button className='order-button' onClick={() => history.push("/order")}>ORDER NOW</button>
          </div>
        </>}
    </div>
  )
}