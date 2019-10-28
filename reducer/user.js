import axios from 'axios';

const SET_USERS = 'SET_USERS'; 

const setUsers = users => ({
  type: SET_USERS,
  users
});

export const setUsersThunks = () => async dispatch => {
  const users = (await axios.get('/api/users')).data;
  dispatch(setUsers(users));
};

const users = (state = [], action) => {
    switch (action.type) {
      case SET_USERS:
          return action.users;
      default:
          return state
    }
};

export default users;

