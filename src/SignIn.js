import React from 'react'
import { connect } from 'react-redux'
import { login } from '../store'

class _SignIn extends React.Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render(){
    const { email, password } = this.state
    const { login } = this.props
    const { onChange } = this

    return (
      <div>
        <form onSubmit={ () => login(this.state)}>
          <div><label>Email: </label><input name="email" value={ email } onChange={ onChange } required/></div>
          <div><label>Password: </label><input name="password" value={ password } onChange={ onChange } required/></div>
          <button className="login">Sign in</button>
        </form> 
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user)=> dispatch(login(user))
    }
}

const SignIn = connect(null, mapDispatchToProps)(_SignIn)

export { SignIn }