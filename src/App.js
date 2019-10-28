import React from 'react';
import Nav from './Nav';
import Routes from './Routes';
import { connect } from 'react-redux';
import { setUsersThunks } from '../reducer/user';

class App extends React.Component {
  componentDidMount() {
    this.props.setUsers();
  }
  render() {
    return (
      <div>
        < Nav />
        < Routes />
      </div>
    );
  }
}

const mapDispatchToAppProps = {
  setUsers: setUsersThunks
}

export default connect(null, mapDispatchToAppProps)(App);