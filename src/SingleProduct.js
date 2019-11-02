import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getProducts, createCartThunks } from '../store';
const { Component } = React;

class _SingleProduct extends Component {
constructor(props) {
  super(props);
  this.state = {
    product: {},
    quantity: 1
   };
  this.create = this.create.bind(this);
}
async create(ev) {
  const { product } = this.state;
  ev.preventDefault();
  const payload = {name: product.name, description: product.description, price: product.price, quantity: product.quantity, imageURL: product.imageURL, genre: product.genre, productId: product.id}
  await this.props.createCart(payload);
}
async componentDidMount() {
  const {data} = await axios.get(`/api/products/${this.props.match.params.id}`)
  this.setState({product: data}) 
}
render() {
  const { product } = this.state;
  return (
    <div>
      <div id='flex'>
        {
          <ul>
            <li key='img'>{product.imageURL}</li>
            <li key='name'>{product.name}</li>
            <li key='genre'>{product.genre}</li>
            <li key='price'>{product.price}</li>
            <select onChange={ (ev) => this.setState({ quantity : ev.target.value}) }>
            <option>Select Qty</option>
            {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
            <button type = 'submit' onClick={this.create}>ADD TO CART</button>
            <li id='description' key='description'>{product.description}</li>
          </ul>
        }
        </div>
    </div>
   )
 };
};

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = {
  getProducts: getProducts,
  createCart: createCartThunks
}

const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(_SingleProduct);

export default SingleProduct
