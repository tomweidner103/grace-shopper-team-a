const API = '/api';

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';

//Action Types

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';
const DESTROY_PRODUCT = 'DESTROY_PRODUCT';
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"
const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS"
const SET_CART = 'SET_CART';
const CREATE_CART = 'CREATE_CART';
const DESTROY = 'DESTROY';
// const UPDATE_CART = 'UPDATE_CART';

//Action Creators

const setProducts = (products)=> ({ type: SET_PRODUCTS, products });
const setUsers = (users)=> ({ type: SET_USERS, users });
const _createUser = (user)=> ({ type: CREATE_USER, user })
const _destroyProduct = (product)=> ({ type: DESTROY_PRODUCT, product});
const setLoginError = (err) => ({ type: SET_LOGIN_ERROR, err });
const setLoginSuccess = (user) => ({ type: SET_LOGIN_SUCCESS, user });
const setCart = cart => ({ type: SET_CART, cart });
const createCart = cart => ({ type: CREATE_CART, cart })
const destroyCart = cart => ({ type: DESTROY, cart });
// const update = cart => ({ type: UPDATE_CART, cart });

//Thunks

const getProducts = ()=> {
  return async(dispatch)=> {
    const products = (await axios.get(`${API}/products`)).data;
    dispatch(setProducts(products))
  }
};

const getUsers = ()=> {
  return async(dispatch)=> {
    const users = (await axios.get(`${API}/users`)).data;
    dispatch(setUsers(users))
  }
};

const createUser = ()=> {
  return async(dispatch)=> {
    const created = (await axios.post(`${API}/users`, user)).data;
    dispatch(_createUser(created));
  }
};

const destroyProduct = (product)=> {
 return async(dispatch)=> {
   const destroyed = (await axios.delete(`${API}/products/${product.id}`, product)).data;
   dispatch(_destroyProduct(product));
 }
};

const onLogin = (user) => { 
  return async(dispatch)=> {
    await axios.post(`${API}/login`, user)
    .then(response => {
      return dispatch(setLoginSuccess(response.data));
    })
    .catch(e => {
      return dispatch(setLoginError(e.message));
    })
  }
}

const setCartThunks = () => async dispatch => {
  const cart = (await axios.get('/api/cart')).data;
  dispatch(setCart(cart));
};

const createCartThunks = (payload) => async dispatch => {
  const cart = (await axios.post('/api/cart', payload)).data;
  console.log(cart)
  dispatch(createCart(cart));
}

const destroyCartThunks = (id) => async dispatch => {
  await axios.delete(`/api/cart/${id}`);
  dispatch(destroyCart(id));
};

// export const updateThunks = (id, cartId) => async dispatch => {
//   const cart = await axios.put(`/api/cart/${id}`, {cartId});
//   dispatch(update(cart));
// };

export { getProducts, getUsers, createUser, destroyProduct, onLogin, setCartThunks, createCartThunks, destroyCartThunks }

//Reducers

const store = createStore(
  combineReducers({
    products: (state = [], action)=> {
      if(action.type === SET_PRODUCTS) {
        return action.products;
      }
      if(action.type === DESTROY_PRODUCT) {
        return [...state].filter( product => product.id !== action.product.id)
      }
      return state;
    },
    users: (state = [], action)=> {
      if(action.type === SET_USERS) {
        return action.users
      }
      if (action.type === CREATE_USER) {
      return [...state, action.user];
    }
    return state;
  },
  login: (state = [], action)=> {
    if(action.type === SET_LOGIN_SUCCESS) {
      return { ...state, email: '', password: '', err: null, user: action.user };
    }
    if(action.type === SET_LOGIN_ERROR) {
      return { ...state, email: '', password: '', user: null, err: action.err, };
    }
    return state;
  },
  cart: (state = [], action) => {
    switch (action.type) {
      case SET_CART:
          return action.cart;
      case CREATE_CART:
          return [...state, action.cart];
      case DESTROY:
          return state.filter(cart => cart.id !== action.cart);
      // case UPDATE_CART:
      //     return state.map(cart => cart.id === action.cart.id ? action.cart : cart)
      default:
          return state
    }
  }
}), applyMiddleware(thunkMiddleware)
);

export default store

