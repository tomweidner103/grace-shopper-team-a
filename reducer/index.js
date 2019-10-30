import { combineReducers } from 'redux';
import user from './user';
import cart from './cart';

const reducer = combineReducers({
  user,
  cart
});

export default reducer;