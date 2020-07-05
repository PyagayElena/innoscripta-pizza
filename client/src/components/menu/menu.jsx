import React, { useState, useEffect } from 'react';
import './menu.scss'
import MenuItem from './menu-item/menu-item'
import SideCart from './side-cart/side-cart'
import ProductService from '../../services/product'

export default function Menu() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const productService = new ProductService();
      // ToDo: Make dynamic service call for other menu sections
      const result = await productService.getPizzaList();
      setList(result);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    isLoading ? <h2 className='page-title'>Loading...</h2> :
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