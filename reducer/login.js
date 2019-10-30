import axios from 'axios';

const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"
const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS"

const setLoginError = err => ({
  type: SET_LOGIN_ERROR,
  err,
});

const setLoginSuccess = user => ({
  type: SET_LOGIN_SUCCESS,
  user,
});

const onLogin = (user) => { 
  return async(dispatch)=> {
    await axios.post('/api/users', user)
    .then(response => {
      return dispatch(setLoginSuccess(response.data));
    })
    .catch(e => {
      return dispatch(setLoginError(e.message));
    })
  }
}

export { onLogin }