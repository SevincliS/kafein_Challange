import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import TodoDetails from './components/TodoDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <div id="app">
          <Switch>
            <Route path="/todo-list/:id" component={TodoDetails} />
            <Route path="/todo-add/list" component={AddTodo} />
            <Route path="/todo-list" component={Todos} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
