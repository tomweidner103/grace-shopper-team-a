import React from 'react';
import {connect} from 'react-redux';
import { setUsersThunks } from '../reducer/User';

class Users extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ul>
        {
          this.state.user.map( u => <li key={u.id}>{u.name}</li>)
        }
      </ul>
    )
  }
};

const mapStateToUsersProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToUserProps = {
  setUsers: setUsersThunks
}

export default connect(mapStateToUsersProps, mapDispatchToUserProps)(Users);