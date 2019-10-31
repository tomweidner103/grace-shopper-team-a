import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getProducts, addToCart } from '../store';

const { Component } = React;


class _SingleProduct extends Component {
constructor() {
  super();
  this.state = {
    product: {},
    quantity: 1
   };
  this.addToCart = this.addToCart.bind(this)
}

async componentDidMount() {
  const { match: { params } } = this.props;
  await axios.get(`/api/products/${params.id}`)
    .then(({ data }) => {
      this.setState({ product: data });
    });
  };
async addToCart(ev) {
 ev.preventDefault()
 await this.props.addToCart(this.state)
}
render() {
  return (
    <div>
      <div id='flex'>

        <li key='img'>{this.state.product.imageURL}</li>

        <li key='name'>{this.state.product.name}</li>

        <li key='genre'>{this.state.product.genre}</li>

        <li key='price'>${this.state.product.price}</li>

        <select onChange={ (ev) => this.setState({ quantity : ev.target.value}) }>
        <option>Select Qty</option>
        {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
        </select>

        <button type = 'submit' onClick={addToCart}>ADD TO CART</button>

        <li id='description' key='description'>{this.state.product.description}</li>
      </div>
    </div>
   )
 };
};

const mapStateToProps = ({ products })=> ({ products });

const mapDispatchToProps = (dispatch) => {
return {
 getProducts: () => dispatch(getProducts())
}
}

const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(_SingleProduct);

export default SingleProduct
