import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../store';
import { setCartThunks } from '../reducer/cart';

class _Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      
    }
    this.destroy = this.destroy.bind(this);
    // this.update = this.update.bind(this);
  }
  async destroy(id) {
    await this.props.destroy(id);
  }
  // async update() {

  // }
  async componentDidMount() {
    await this.props.getProducts();
    await this.props.setCart();
  }
  render() {
    const { products, cart, destroy } = this.props
    console.log(this.props)
    return (
      <div>
        {/* Cart Items: { products.filter(product => product.cartId === cart.productId).length} */}
        <ul>
          {
           products.map( product =>
            // cart.map( c => product.cartId === c.productId 
            //  ?
            <div key={product.id} id='flex'>
                <Link to={`/products/${product.id}`} activeclassname="active"><li key='img'><img src ={product.imageURL}></img></li></Link>
                <Link to={`/products/${product.id}`} activeclassname="active"><h1 key='name'>{product.name}</h1></Link>
                <li key='genre'>{product.genre}</li>
                <li key='price'>{product.price}</li>
                <button onClick = { destroy }>Delete</button>
           </div> )
            // : 'Nothing in cart'))
          }
        </ul>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    products: state.products,
    cart: state.cart
  }
}

const mapDispatchToProps = {
  getProducts: getProducts,
  setCart: setCartThunks
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(_Cart);

export default Cart