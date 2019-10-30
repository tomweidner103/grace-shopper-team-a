import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../store';

const { Component } = React;

class _Products extends Component {
 constructor() {
   super();
 }
 async componentDidMount() {
   console.log('hey');
   await this.props.getProducts()
 }
 render() {
   const {products} = this.props
   console.log(products);
   return (
     <div>
       <ul>
         {
           products.map( product => {
             return (
               <div key='allProducts' id='flex'>
                  <Link to={`/products/${product.id}`} activeclassname="active"><li key='img'><img src ={product.imageURL}></img></li></Link>
                  <Link to={`/products/${product.id}`} activeclassname="active"><h1 key='name'>{product.name}</h1></Link>
                  <li key='genre'>{product.genre}</li>
                  <li key='price'>{product.price}</li>
               </div>
             );
           })
         }
       </ul>
     </div>
   );
 };
};

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = (dispatch) => {
return {
  getProducts: () => dispatch(getProducts())
 };
};

const Products = connect(mapStateToProps, mapDispatchToProps)(_Products);

export default Products






