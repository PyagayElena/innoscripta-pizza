import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.scss';
import Menu from './components/menu/menu';
import Order from './components/order/order';
import SectionInProgress from './components/section-in-progress/section-in-progress';
import Modal from './components/common/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, selectorUser, update } from './store/user-slice'
import { CURRENCY } from './constants';
import Login from './components/login/login';
import Profile from './components/profile/profile';
import UserService from './services/user';

function App() {
  const user = useSelector(selectorUser);
  const [ showSignin, setShowSignin ] = useState(false);
  const dispatch = useDispatch();
  const location = window.location.pathname.split('/')[1];
  const [currentRoute, setCurrentRoute] = useState(location ? location.toUpperCase() : 'PIZZAS');

  useEffect( () => {
    const fetchData = async () => {
      const userService = new UserService();
      const user = await userService.silentAuthorize();
      if (!!user) {
        dispatch(update(user));
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = [
    { title: 'PIZZAS', path: '/' },
    { title: 'SALADS', path: '/salads' },
    { title: 'DESSERTS', path: '/desserts' },
    { title: 'SAUCES', path: '/sauces' },
    { title: 'DRINKS', path: '/drinks' }];

  return (
    <Router>

      <header className="header">
        <div className='container header-container'>
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
            {user.id ?
              <Link to='/profile' className='profile-button'>
                Profile
              </Link> :
              <button className={`signin-button ${showSignin && 'disabled'}`} onClick={() => setShowSignin(true)}>
                SIGN IN
              </button>}
          </div>
        </div>
      </header>

      <div className="body-container">
        <div className='container'>
          <Switch>
            <Route exact path="/" component={Menu} />
            <Route path="/order" component={Order} />
            <Route path="/profile" component={!!user.id ? Profile : Menu} />
            <Route path="/salads" component={SectionInProgress} />
            <Route path="/desserts" component={SectionInProgress} />
            <Route path="/sauces" component={SectionInProgress} />
            <Route path="/drinks" component={SectionInProgress} />
          </Switch>
        </div>
      </div>

      <Modal show={showSignin} handleClose={() => setShowSignin(false)}>
        <Login handleClose={() => setShowSignin(false)} />
      </Modal>
    </Router>
  );
}

export default App;
