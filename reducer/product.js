import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS'; 
const DESTROY = 'DESTROY';
// const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
});

const destroy = product => ({
  type: DESTROY,
  product
});

// const update = product => ({
//   type: UPDATE_PRODUCTS,
//   product 
// });

export const setProductsThunks = () => async dispatch => {
  const products = (await axios.get('/api/products')).data;
  dispatch(setProducts(products));
};

export const destroyThunks = (id) => async dispatch => {
  await axios.delete(`/api/products/${id}`);
  dispatch(destroy(id));
};

// export const updateThunks = (id, userId) => async dispatch => {
//   const product = await axios.put(`/api/products/${id}`, {productId});
//   dispatch(update(product));
// };

const products = (state = [], action) => {
    switch (action.type) {
      case SET_PRODUCTS:
          return action.products;
      case DESTROY:
          return state.filter(product => product.id !== action.product);
      // case UPDATE_PRODUCTS:
      //     return state.map(product => product.id === action.product.id ? action.product : product)
      default:
          return state
    }
};

export default products;

