import axios from 'axios';

const SET_CART = 'SET_CART'; 
const DESTROY = 'DESTROY';
// const UPDATE_CART = 'UPDATE_CART';

const setCart = cart => ({
  type: SET_CART,
  cart
});

const destroy = cart => ({
  type: DESTROY,
  cart
});

const update = cart => ({
  type: UPDATE_CART,
  cart 
});

export const setCartThunks = () => async dispatch => {
  const cart = (await axios.get('/api/cart')).data;
  dispatch(setCart(cart));
};

export const destroyThunks = (id) => async dispatch => {
  await axios.delete(`/api/cart/${id}`);
  dispatch(destroy(id));
};

export const updateThunks = (id, cartId) => async dispatch => {
  const cart = await axios.put(`/api/cart/${id}`, {cartId});
  dispatch(update(cart));
};

const cart = (state = [], action) => {
    switch (action.type) {
      case SET_CART:
          return action.cart;
      case DESTROY:
          return state.filter(cart => cart.id !== action.cart);
      case UPDATE_CART:
          return state.map(cart => cart.id === action.cart.id ? action.cart : cart)
      default:
          return state
    }
};

export default cart;

