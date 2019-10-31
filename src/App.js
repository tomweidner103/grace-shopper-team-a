import React from 'react';
import Nav from './Nav';
import Routes from './Routes';
import { connect } from 'react-redux';
import { SignIn } from './SignIn';
import { getUsers } from '../store';

class App extends React.Component {
  componentDidMount() {
    this.props.getUsers();
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
  getUsers: getUsers
}

export default connect(null, mapDispatchToAppProps)(App);
