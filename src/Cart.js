import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, setCartThunks, destroyCartThunks, updateThunks } from '../store';

class _Cart extends React.Component {
  constructor() {
    super();
    this.state = {
    }
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }
  async destroy(id) {
    await this.props.destroy(id);
  }
  async update(id, method) {
    await this.props.update(id, method);
  }
  async componentDidMount() {
    await this.props.getProducts();
    await this.props.setCart();
  }
  render() {
    console.log(this.props.cart);
    const { products, cart, destroy, update } = this.props
    const items = cart.map( c => {
      return {...c, cart: products.filter(product => c.productId === product.id)};
    });
    return (
      <div>
        Cart Items: { items.length }
        <ul>
          {
            (items.map( item =>
               <div key={item.id} id='flex'>
                <Link to={`/products/${item.id}`} activeclassname="active"><li key='img'><img src ={item.product.imageURL}></img></li></Link>
                <Link to={`/products/${item.id}`} activeclassname="active"><h1 key='name'>{item.product.name}</h1></Link>
               <li key='genre'>{item.product.genre}</li>
               <li key='quantity'>{item.quantity}</li>
                <li key='price'>${item.product.price}</li>

                <button onClick = { () => update(item.id, 'add') } >+</button>
                <button onClick = { () => update(item.id, 'subtract') } >-</button>

                <button onClick = { () => destroy(item.id) }>Delete</button>
               </div>
            ))
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
  destroy: destroyCartThunks,
  update: updateThunks
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(_Cart);

export default Cart
