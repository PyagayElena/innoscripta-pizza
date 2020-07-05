import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './menu-item.scss'
import { add, remove, selectorCart } from '../../../store/cart-slice'
import NumberToPrice from '../../../helpers/price'
import { selectorUser } from '../../../store/user-slice'

export default function MenuItem({ data }) {

  const cart = useSelector(selectorCart);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();

  return (
    <div className='menu-item-card'>
      <div>
        <figure className='image-container'>
          {data.image && <img src={require(`../../../assets/${data.image}`)} className='image' alt='menu-item' />}
        </figure>
        <div className='name'>
          {data.title && <h3>{data.title}</h3>}
        </div>
        {data.ingredients && <div className='description'>{data.ingredients}</div>}
      </div>

      <div className='footer'>
        <div className='counter-container'>
          <button className={`counter-button ${!cart.products[data._id] && 'disabled'}`}
                  onClick={() => cart.products[data._id] && dispatch(remove(data))}>
            -
          </button>
          <div className='counter'>{cart.products[data._id] ? cart.products[data._id].count : 0}</div>
          <button className='counter-button'
                  onClick={() => dispatch(add(data))}>
            +
          </button>
        </div>
        {data.price !== undefined && <div className='price'>{NumberToPrice(data.price, user.currency)}</div>}
      </div>
    </div>
  );
}