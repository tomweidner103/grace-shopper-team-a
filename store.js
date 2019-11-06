const API = '/api';

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';

//Action Types

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DESTROY_PRODUCT = 'DESTROY_PRODUCT';
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"
const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS"
const SET_CART = 'SET_CART';
const CREATE_CART = 'CREATE_CART';
const DESTROY = 'DESTROY';
const SET_LINEITEM ='SET_LINEITEM';
const CREATE_LINE_ITEM ='CREATE_LINE_ITEM';
const UPDATE_CART = 'UPDATE_CART';

//Action Creators

const setProducts = (products)=> ({ type: SET_PRODUCTS, products });
const setUsers = (users)=> ({ type: SET_USERS, users });
const _createUser = (user)=> ({ type: CREATE_USER, user });
const updateUser = (user) => ({ type: UPDATE_USER, user })
const _destroyProduct = (product)=> ({ type: DESTROY_PRODUCT, product});
const setLoginError = (err) => ({ type: SET_LOGIN_ERROR, err });
const setLoginSuccess = (user) => ({ type: SET_LOGIN_SUCCESS, user });
const setCart = cart => ({ type: SET_CART, cart });
const createCart = cart => ({ type: CREATE_CART, cart })
const destroyCart = cart => ({ type: DESTROY, cart });
const _createLineItem = (lineitem) => ({ type: CREATE_LINE_ITEM, lineitem})
const update = cart => ({ type: UPDATE_CART, cart });

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

const createUser = (user)=> {
  return async(dispatch) => {
    const created = (await axios.post('/api/users', user)).data
    dispatch(_createUser(created))
  }
}

const updateUserThunks = (id, payload) => async dispatch => {
  const user = (await axios.put(`/api/users`, {id: id, ...payload})).data;
  dispatch(updateUser(user));
}; 

const destroyProduct = (product)=> {
 return async(dispatch)=> {
   const destroyed = (await axios.delete(`${API}/products/${product.id}`, product)).data;
   dispatch(_destroyProduct(product));
 }
};

const onLogin = (user) => {
  return async(dispatch)=> {
    await axios.post(`/api/login`, user)
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
  dispatch(createCart(cart));
}

const destroyCartThunks = (id) => async dispatch => {
  await axios.delete(`/api/cart/${id}`);
  dispatch(destroyCart(id));
};

const createLineItem = ()=> {
  return async(dispatch)=> {
    const created = (await axios.post(`${API}/cart`, lineitem)).data;
    dispatch(_createLineItem(created));
  }
};

const updateThunks = (id, method) => async dispatch => {
  const cart = (await axios.put(`/api/cart`, {id: id, method})).data;
  dispatch(update(cart));
};

export { getProducts, getUsers, createUser, updateUserThunks, destroyProduct, onLogin, setCartThunks, createCartThunks, destroyCartThunks, updateThunks, createLineItem }

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
    user: (state = [], action)=> {
      if(action.type === SET_USERS) {
        return action.users
      }
      if (action.type === CREATE_USER) {
        return [...state, action.user];
      }
      if (action.type === UPDATE_USER) {
        return state.map(user => user.id === action.user.id ? action.user : user) 
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
      case UPDATE_CART:
        console.log(action);
          return state.map(cart => cart.id === action.cart.id ? action.cart : cart)
      default:
          return state
    }
  },
  lineitem: (state = [], action) => {
    switch (action.type) {
      case CREATE_LINE_ITEM:
        return [...state, action.cart];
    }
    return state;
  }
}), applyMiddleware(thunkMiddleware)
);

export default store

