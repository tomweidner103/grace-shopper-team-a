const API = '/api';

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';

//Action Types

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';
const DESTROY_PRODUCT = 'DESTROY_PRODUCT';

//Action Creators

const setProducts = (products)=> ({ type: SET_PRODUCTS, products });
const setUsers = (users)=> ({ type: SET_USERS, users });
const _createUser = (user)=> ({ type: CREATE_USER, user })
const _destroyProduct = (product)=> ({ type: DESTROY_PRODUCT, product});

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

export { getProducts, getUsers, createUser, destroyProduct }

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
  }}), applyMiddleware(thunkMiddleware)
);

export default store

