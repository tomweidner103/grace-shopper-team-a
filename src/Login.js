import React from 'react'
import { connect } from 'react-redux'
import { onLogin } from '../store'

class _Login extends React.Component{
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
    const { onLogin } = this.props
    const { onChange } = this

    return (
      <div className="login">
        <form onSubmit={ (ev) =>{ev.preventDefault(); onLogin(this.state)}}>
          <div><label>Email Address</label><input name="email" type="email" placeholder="enter your reistered email id" value={ email } onChange={ onChange } required/></div>
          <div><label>Password</label><input name="password" type="password" placeholder="enter your password" value={ password } onChange={ onChange } required/></div>
          <button className="onLogin">Login</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user)=> dispatch(onLogin(user))
    }
}

const Login = connect(null, mapDispatchToProps)(_Login)

export { Login }
