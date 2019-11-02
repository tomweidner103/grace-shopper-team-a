import React from 'react';
import Nav from './Nav';
import Routes from './Routes';
import { connect } from 'react-redux';
import { SignIn } from './SignIn';
import { getUsers, getProducts } from '../store';

class App extends React.Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getProducts();
  }
  render() {
    return (
      <div>
        < SignIn />
        < Nav />
        < Routes />
      </div>
    );
  }
}

const mapDispatchToAppProps = {
  getUsers: getUsers,
  getProducts: getProducts
}

export default connect(null, mapDispatchToAppProps)(App);
