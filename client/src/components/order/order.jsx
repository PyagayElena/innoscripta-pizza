import React from 'react';
import './order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectorCart, clear } from '../../store/cart-slice';
import { changeCurrency, selectorUser } from '../../store/user-slice';
import { useForm, Controller } from 'react-hook-form';
import MaskedInput from "react-input-mask";
import { CURRENCY_SIGN } from '../../constants';
import Cart from './cart/cart'

export default function Order() {
  const cart = useSelector(selectorCart);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();

  const { register, handleSubmit, control, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    // ToDo: Submit order when backend is ready to process anonymous orders
    console.log(data);
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
    </div>
  );
}