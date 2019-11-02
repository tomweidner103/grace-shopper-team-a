import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../store'

class _SignUp extends React.Component{
  constructor(){
    super();
    this.state = {
      username: '',
      email: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render(){
    const { username, email } = this.state
    const { createUser } = this.props
    const { onChange } = this

    return (
      <div className="createUser user_container">
        <form onSubmit={ () => createUser(this.state)}>
          <div><label>Name: </label><input name="username" value={ username } onChange={ onChange } required/></div>
          <div><label>Email: </label><input name="email" value={ email } onChange={ onChange } required/></div>
          <button className="create">Create User</button>
        </form> 
      </div>
    );
  }
}

const mapStateToProps = ({ users}) => ({ users })

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user)=> dispatch(createUser(user))
    }
}

const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)

export { SignUp }