import { combineReducers } from 'redux';
import user from './user';
import cart from './cart';
import onLogin from './login'

const reducer = combineReducers({
  user,
  onLogin,
  cart
});

export default reducer;