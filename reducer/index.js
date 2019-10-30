import { combineReducers } from 'redux';
import user from './user';
import onLogin from './login'

const reducer = combineReducers({
  user,
  onLogin
});

export default reducer;