import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.scss';
import Pizzas from './components/pizzas/pizzas';
import Cart from './components/cart/cart';
import SectionInProgress from './components/section-in-progress/section-in-progress';
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency, selectorUser } from './store/user-slice'
import { CURRENCY } from './constants'

function App() {
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();
  const location = window.location.pathname.split('/')[1];
  const [currentRoute, setCurrentRoute] = useState(location ? location.toUpperCase() : 'PIZZAS');

  const routes = [
    { title: 'PIZZAS', path: '/' },
    { title: 'SALADS', path: '/salads' },
    { title: 'DESSERTS', path: '/desserts' },
    { title: 'SAUCES', path: '/sauces' },
    { title: 'DRINKS', path: '/drinks' }];

  return (
    <Router>

      <header className="header">
        <img src={logo} className="logo" alt="logo" />

        <ul className="menu-bar">
          {routes.map(route =>
            <li key={route.title}>
              <Link to={route.path}
                    onClick={() => setCurrentRoute(route.title)}
                    className={`menu-bar-link ${(currentRoute === route.title) && 'selected'}`}>
                    {route.title}
              </Link>
            </li>
          )}
        </ul>

        <div className="header-buttons">
          <button className={`currency-button ${user.currency === CURRENCY.dollar && 'selected'}`}
                  onClick={() => dispatch(changeCurrency(CURRENCY.dollar))}>$</button>/
          <button className={`currency-button ${user.currency === CURRENCY.euro && 'selected'}`}
                  onClick={() => dispatch(changeCurrency(CURRENCY.euro))}>€</button>
          <button className="signin-button">SIGN IN</button>
        </div>
      </header>

      <div className="body-container">
        <Switch>
          <Route exact path="/" component={Pizzas} />
          <Route path="/cart" component={Cart} />
          <Route path="/salads" component={SectionInProgress} />
          <Route path="/desserts" component={SectionInProgress} />
          <Route path="/sauces" component={SectionInProgress} />
          <Route path="/drinks" component={SectionInProgress} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
