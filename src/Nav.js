import React from 'react';
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <header>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>Shop</NavLink>
        <NavLink to='/cart'>Cart</NavLink>
      </nav>
    </header>
  );
}

const mapState = state => {
  return {
    users: state.users,
  }
}

export default connect(mapState)(Nav);
