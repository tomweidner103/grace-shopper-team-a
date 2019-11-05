import React from 'react';
import {connect} from 'react-redux';

const Home = () => {
  return (
    <div>
    </div>
  );
}

const mapState = state => {
  return {
    users: state.users,
  }
}

export default connect(mapState)(Home);
