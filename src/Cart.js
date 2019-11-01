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
    const items = cart.map( c => {
      return {...c, cart: products.filter(product => c.productId === product.id)};
    });
    return (
      <div>
        Cart Items: { products.map(product => product.id === cart.productId).length}
        <ul>
          {
            products.map( product => console.log(product, 'p', cart ))
            // products.map( product => console.log(product.id === cart.productId))
            // items.map( item => console.log( item ) )
            // (items.map( item => 
            //   item.id === item.cart.productId && cart.length > 0 ?
            //   <div key={item.id} id='flex'>
            //     <Link to={`/products/${item.id}`} activeclassname="active"><li key='img'><img src ={item.imageURL}></img></li></Link>
            //     <Link to={`/products/${item.id}`} activeclassname="active"><h1 key='name'>{item.name}</h1></Link>
            //     <li key='genre'>{item.genre}</li>
            //     <li key='price'>{item.price}</li>
            //     {/* <button onClick = { updateCart({...cart, quantity: this.state.quantity + 1 }) } >+</button> increase quantity of item in cart */}
            //     {/* <button onClick = { updateCart({...cart, quantity: this.state.quantity - 1 }) } >-</button> decrease quantity of item in cart */}
            //   < button onClick = { destroy }>Delete</button>
            //   </div>
            // : 'Nothing here'
            // ))
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