import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getProducts} from '../store';

const { Component } = React;


class _SingleProduct extends Component {
 constructor() {
   super();
   this.state = {product: {}};
 }
 componentDidMount() {
   const { match: { params } } = this.props;
   axios.get(`/api/products/${params.id}`)
     .then(({ data }) => {
       this.setState({ product: data });
     });
   };
 render() {
   return (
     <div>
       <div id='flex'>
         <li key='img'>{this.state.product.imageURL}</li>
         <li key='name'>{this.state.product.name}</li>
         <li key='genre'>{this.state.product.genre}</li>
         <li key='price'>{this.state.product.price}</li>
         <li key='description'>{this.state.product.description}</li>
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
