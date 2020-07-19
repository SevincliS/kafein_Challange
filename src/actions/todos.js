const addTodoAction = ({ title, text, mail }) => ({
  type: 'ADD_TODO',
  id: new Date().getTime(),
  title,
  text,
  mail,
});

const toggleTodoAction = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

const removeTodoAction = (id) => ({
  type: 'REMOVE_TODO',
  id,
});

export { addTodoAction, toggleTodoAction, removeTodoAction };
