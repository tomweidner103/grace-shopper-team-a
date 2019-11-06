// import React from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { getUsers, updateUserThunks, createUser, getProducts, createCartThunks } from '../store';
// const { Component } = React;

// class _Admin extends Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     user: {},
//     product: {},
//     name: '',
//     email: ''
//   };
//   this.onChange = this.onChange.bind(this);
//   this.updateUser = this.updateUser.bind(this);
// }
// onChange(ev) {
//   this.setState({ [ev.target.name] : ev.target.value });
// }
// async updateUser(ev) {
//   ev.preventDefault();
//   const payload = {name: this.state.name, email: this.state.email}
//   await this.props.updateUser(this.state.user.id, payload);
//   this.props.history.push('/users');
// }
// async componentDidMount() {
//   const {u} = await axios.get(`/api/users/${this.props.match.params.id}`)
//   this.setState({user: u, name: u.name, email: u.email}) 
//   const {p} = await axios.get(`/api/products/${this.props.match.params.id}`)
//   this.setState({product: p}) 
// }
// render() {
//   const { updateUser, onChange } = this;
//   const { product, user } = this.state;
//   return (
//     <div>
//       <div id='flex'>
//         {
//           console.log(user, product)
//           <form>
//             {user.name}<input name='name' value={this.state.name} onChange = { onChange } /> <br/>
//             {user.email}<input name='email' value={this.state.email} onChange = { onChange } /> 
//             <button onClick = { updateUser } >Edit</button>
//           </form>
//         }
//         </div>
//       <div id='flex'>
//         {
//           <ul>
//             <li key='img'>{product.imageURL}</li>
//             <li key='name'>{product.name}</li>
//             <li key='genre'>{product.genre}</li>
//             <li key='price'>{product.price}</li>
//             <select onChange={ (ev) => this.setState({ quantity : ev.target.value}) }>
//             <option>Select Qty</option>
//             {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
//             </select>
//             <button type = 'submit' onClick={this.create}>ADD TO CART</button>
//             <li id='description' key='description'>{product.description}</li>
//           </ul>
//         }
//         </div>
//     </div>
//    )
//  };
// };

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     products: state.products
//   }
// }

// const mapDispatchToProps = {
//   getUsers: getUsers,
//   createUser: createUser,
//   updateUser: updateUserThunks,
//   getProducts: getProducts,
//   createCart: createCartThunks
// }

// const Admin = connect(mapStateToProps, mapDispatchToProps)(_Admin);

// export default Admin