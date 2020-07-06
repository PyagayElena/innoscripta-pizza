import React, { useEffect, useState } from 'react'
import '../order/order.scss';
import './profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, update, signOut, selectorUser } from '../../store/user-slice';
import { useForm, Controller } from 'react-hook-form';
import MaskedInput from "react-input-mask";
import { CURRENCY_SIGN } from '../../constants';
import UserService from '../../services/user';
import OrderService from '../../services/order';
import NumberToPrice from '../../helpers/price'
import { useHistory } from 'react-router-dom'

export default function Profile() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ orders, setOrders ] = useState([]);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();
  const userService = new UserService();
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const orderService = new OrderService();
      const result = await orderService.getHistory(user.id);
      setOrders(result);
      setIsLoading(false);
    };

    if (!!user.id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, control, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    const newUser = { ...user, address: data.address, phone: data.phone };

    dispatch(update(newUser));
    await userService.updateUser(newUser);
  };

  const onSignout = () => {
    userService.signOut();
    dispatch(signOut());
    history.push("/");
  }

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

          <div className='profile-footer'>
            <button className='signout' onClick={onSignout}>
              Sign out
            </button>
            <button className={`submit ${!formState.isValid && 'disabled'}`} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className='column right'>
        <div className='history-container'>
          <div className='history-header'>
            <h3 className='title'>Previous orders</h3>
            {isLoading && <div className='spinner' />}
          </div>
          <ul className='order-list'>
            { orders.map(item =>
              <li className='order-item' key={item._id}>
                <div className='item-details'>
                  <h5 className='date'>{new Date(item.date).toLocaleDateString('en-GB')}</h5>
                  <div className='description'>{item.products}</div>
                </div>
                <div className='price'>{NumberToPrice(item.total, user.currency)}</div>
              </li> )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}