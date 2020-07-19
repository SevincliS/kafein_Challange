let INITIAL_STATE =
  JSON.parse(window.localStorage.getItem('todos')) !== null
    ? JSON.parse(window.localStorage.getItem('todos'))
    : [];

const todos = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TODO':
      newState = [
        ...state,
        {
          id: action.id,
          title: action.title,
          text: action.text,
          mail: action.mail,
          completed: false,
        },
      ];
      updateLocalStorage(newState);
      return newState;
    case 'TOGGLE_TODO':
      newState = state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
      updateLocalStorage(newState);
      return newState;
    case 'REMOVE_TODO':
      newState = state.filter((todo) => todo.id !== action.id);
      updateLocalStorage(newState);
      return newState;

    default:
      return state;
  }
};

const updateLocalStorage = (todos) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
};

export default todos;
