const setUserAction = (mail) => ({
  type: 'SET_USER',
  mail,
});

const resetUserAction = (history) => ({
  type: 'RESET_USER',
  history,
});

export { setUserAction, resetUserAction };
