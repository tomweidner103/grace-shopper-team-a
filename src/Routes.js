import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import SingleProduct from './SingleProduct';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component = { Home } />
        <Route path='/products' component = { Products } />
        <Route path='/products/:id' component = { SingleProduct } />
      </Switch>
    );
  }
}

export default Routes;
