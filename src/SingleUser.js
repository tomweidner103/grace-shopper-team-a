import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUsers, updateUserThunks, createUser } from '../store';
const { Component } = React;

class _SingleUser extends Component {
constructor(props) {
  super(props);
  this.state = {
    user: {},
    name: '',
    email: ''
  };
  this.updateUser = this.updateUser.bind(this);
  this.onChange = this.onChange.bind(this);
}
onChange(ev) {
  this.setState({ [ev.target.name] : ev.target.value });
} 
async updateUser(ev) {
  ev.preventDefault();
  const payload = {name: this.state.name, email: this.state.email}
  await this.props.updateUser(this.state.user.id, payload);
  this.props.history.push('/users');
}
async componentDidMount() {
  const {data} = await axios.get(`/api/users/${this.props.match.params.id}`)
  this.setState({user: data, name: data.name, email: data.email}) 
}
render() {
  const { user } = this.state;
  const { updateUser, onChange } = this;
  return (
    <div>
      <div id='flex'>
        {
          <form>
            {user.name}<input name='name' value={this.state.name} onChange = { onChange } /> <br/>
            {user.email}<input name='email' value={this.state.email} onChange = { onChange } /> 
            <button onClick = { updateUser } >Edit</button>
          </form>
        }
        </div>
    </div>
   )
 };
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  getUsers: getUsers,
  createUser: createUser,
  updateUser: updateUserThunks
}

const SingleUser = connect(mapStateToProps, mapDispatchToProps)(_SingleUser);

export default SingleUser
