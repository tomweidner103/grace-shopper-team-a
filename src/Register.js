import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../store'

class _Register extends React.Component{
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev){
    ev.preventDefault()
    this.props.createUser({...this.state})
    
  }

  render(){
    const { name, email, password } = this.state
    const { onChange, onSubmit } = this

    return (
      <div className="register">
        <form onSubmit={ onSubmit }>
          <div><label>Full Name</label><input name="name" type="text" placeholder="enter your full name" value={ name } onChange={ onChange } required/></div>
          <div><label>Email Address</label><input name="email" type="email" placeholder="enter email address" value={ email } onChange={ onChange } required/></div>
          <div><label>Choose a password</label><input name="password" type="password" placeholder="choose a password" value={ password } onChange={ onChange } required/></div>
          <button className="onRegister">Register</button>
        </form> 
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({createUser: (user) => dispatch(createUser(user))})

const Register = connect(null, mapDispatchToProps)(_Register)

export { Register }