const INITIAL_STATE = JSON.parse(window.localStorage.getItem('user'));

const user = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'SET_USER':
      newState = { mail: action.mail };
      updateLocalStorage(newState);
      return newState;
    case 'RESET_USER':
      newState = {};
      updateLocalStorage(newState);
      action.history.push('/');
      return newState;
    default:
      return state;
  }
};

const updateLocalStorage = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user));
};

export default user;
