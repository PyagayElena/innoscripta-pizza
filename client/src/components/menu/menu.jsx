import React, { useState, useEffect } from 'react';
import './menu.scss';
import MenuItem from './menu-item/menu-item';
import SideCart from './side-cart/side-cart';
import ProductService from '../../services/product';
import Loader from '../common/loader/loader';
import { useDispatch, useSelector } from 'react-redux'
import { selectorProduct, update } from '../../store/product-slice'

export default function Menu() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const list = useSelector(selectorProduct);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const productService = new ProductService();
      // ToDo: Make dynamic service call for other menu sections
      const result = await productService.getPizzaList();
      dispatch(update(result));
      setIsLoading(false);
    };

    if (!list || !list.length) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isLoading ? <Loader /> :
    <>
      <h2 className='page-title'>Pizzas</h2>
      <div className='pizzas-container'>
        <div className='menu-section'>
          <ul className='menu-list'>
            { list.map(item =>
              <li className='menu-item' key={item._id}>
                <MenuItem data={item}/>
              </li> )}
          </ul>
        </div>
        <div className='cart-section'>
          <SideCart />
        </div>
      </div>
    </>
  );
}