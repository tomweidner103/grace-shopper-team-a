import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, setCartThunks } from '../store';

class _Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      // quantity: cart.quantity
    }
    this.destroy = this.destroy.bind(this);
    // this.update = this.update.bind(this);
  }
  async destroy(id) {
    await this.props.destroy(id);
  }
  async componentDidMount() {
    await this.props.getProducts();
    await this.props.setCart();
  }
  render() {
    const { products, cart, destroy } = this.props
    console.log(this.props)
    return (
      <div>
        Cart Items: { products.filter(product => product.id === cart.productId).length}
        <ul>
          {
           products.map( product => product.id === cart.productId
             ?
            <div key={product.id} id='flex'>
                <Link to={`/products/${product.id}`} activeclassname="active"><li key='img'><img src ={product.imageURL}></img></li></Link>
                <Link to={`/products/${product.id}`} activeclassname="active"><h1 key='name'>{product.name}</h1></Link>
                <li key='genre'>{product.genre}</li>
                <li key='price'>{product.price}</li>
                {/* <button onClick = { updateCart({...cart, quantity: this.state.quantity + 1 }) } >+</button> increase quantity of item in cart */}
                {/* <button onClick = { updateCart({...cart, quantity: this.state.quantity - 1 }) } >-</button> decrease quantity of item in cart */}
                <button onClick = { destroy }>Delete</button>
           </div> 
            : 'Nothing in cart')
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
  setCart: setCartThunks,
  // updateCart: updateCartThunks
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(_Cart);

export default Cart