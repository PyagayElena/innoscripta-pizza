import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css';
import Pizzas from './components/pizzas/pizzas';
import Cart from './components/cart/cart';
import SectionInProgress from './components/section-in-progress/section-in-progress';

function App() {
  const routes = [
    { title: 'PIZZAS', path: '/' },
    { title: 'SALADS', path: '/section-in-progress' },
    { title: 'DESERTS', path: '/section-in-progress' },
    { title: 'SAUCES', path: '/section-in-progress' },
    { title: 'DRINKS', path: '/section-in-progress' }];

  return (
    <Router>

      <header className="header">
        <img src={logo} className="logo" alt="logo" />

        <ul className="menu-bar">
          {routes.map(route =>
            <li key={route.title} className="menu-bar-item">
              <Link to={route.path} className="menu-bar-link">
                {route.title}
              </Link>
            </li>
          )}
        </ul>

        <div className="header-buttons">
          <button className="currency-button">Currency: $</button>
          <button className="signin-button">SIGN IN</button>
        </div>
      </header>

      <Switch>
        <Route exact path="/" component={Pizzas} />
        <Route path="/cart" component={Cart} />
        <Route path="/section-in-progress" component={SectionInProgress} />
      </Switch>

    </Router>
  );
}

export default App;
