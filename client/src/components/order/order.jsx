import React, { useState } from 'react';
import './order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectorCart, clear } from '../../store/cart-slice';
import { changeCurrency, selectorUser } from '../../store/user-slice';
import { useForm, Controller } from 'react-hook-form';
import MaskedInput from "react-input-mask";
import { CURRENCY_SIGN } from '../../constants';
import Cart from './cart/cart';
import OrderService from '../../services/order';
import Modal from '../common/modal/modal'

export default function Order() {
  const [ showSuccess, setShowSuccess ] = useState(false);
  const cart = useSelector(selectorCart);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();

  const { register, handleSubmit, control, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    if (!!user.id) {
      const order = {
        total: cart.totalCost,
        currency: user.currency,
        userId: user.id,
        email: user.email,
        date: new Date().toISOString(),
        cart: Object.values(cart.products)
      };

      const orderService = new OrderService();
      await orderService.makeOrder(order);
    }

    // ToDo: submit order for anonymous users when backend is ready
    setShowSuccess(true);
    dispatch(clear());
  };

  return (
    <div className='order-container'>
      <div className='column'>
        <h3 className='column-title'>Contact information</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Address*
            <input
              type="text"
              name="address"
              defaultValue={user.address}
              ref={register({
                required: { value: true }
              })}
            />
          </label>

          <label>
            Phone*
            <Controller
              as={MaskedInput}
              control={control}
              mask="+7 (999) 999-99-99"
              name="phone"
              defaultValue={user.phone}
              rules={{ required: true, pattern: /^[+][7][\s][(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/im }}
            />
          </label>

          <label>
            Currency*
            <select name='currency'
                    ref={register({
                      required: { value: true }
                    })}
                    value={user.currency}
                    onChange={e => dispatch(changeCurrency(e.target.value))}>
              {Object.entries(CURRENCY_SIGN).map(entry => (
                <option key={entry[0]} value={entry[0]}>{entry[1]}</option>
              ))}
            </select>
          </label>

          <div className='footer'>
            <button className={`submit ${(!formState.isValid || !cart.totalCount) && 'disabled'}`} type="submit">
              ORDER
            </button>
          </div>
        </form>
      </div>

      <div className='column right'>
        <Cart />
      </div>

      <Modal show={showSuccess} handleClose={() => setShowSuccess(false)}>
        <div className='success-container'>
          <div className='success-message'>
            Your order has been received. The delivery will take up to 1 hour. Bon Appetit!
          </div>
          <div className='success-footer'>
            <button className='success-button' onClick={() => setShowSuccess(false)}>
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}