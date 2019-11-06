import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers, updateUserThunks } from '../store';

class Users extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    await this.props.getUsers();
  }
  render() {
    return (
      <ul>
        {
          this.props.user.map( u => <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link><br/>
            {u.email}
            </li>)
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
  getUsers: getUsers,
  updateUser: updateUserThunks
}

export default connect(mapStateToUsersProps, mapDispatchToUserProps)(Users);
