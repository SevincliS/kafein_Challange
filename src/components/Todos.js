import React, { Component } from 'react';
import { ListGroup, Container, Col, Row, InputGroup } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toggleTodoAction, removeTodoAction } from '../actions/todos';
import { resetUserAction } from '../actions/user';

import { withRouter } from 'react-router-dom';
import AddTodo from './AddTodo';
import {
  CheckCircleFill,
  Circle,
  XCircleFill,
  PersonCircle,
} from 'react-bootstrap-icons';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTodoId: '',
      selectedFilter: '',
    };
  }

  componentDidMount = () => {
    const { resetUser, user, history } = this.props;
    if (user.mail === undefined) {
      resetUser(history);
    }
  };

  changeActiveTodo = (id) => {
    this.setState({ activeTodoId: id });
  };

  render() {
    const { activeTodoId, selectedFilter } = this.state;
    const {
      todos,
      toggleTodo,
      removeTodo,
      user,
      resetUser,
      history,
    } = this.props;
    return (
      <>
        <Container>
          <Row>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <Row id="userNameRow">
                <div>
                  {user.mail !== undefined ? user.mail.split('@')[0] : null}
                </div>
                <PersonCircle
                  id="logoPersonCircle"
                  onClick={() => {
                    resetUser(history);
                  }}
                />
                <div
                  id="logOutText"
                  onClick={() => {
                    resetUser(history);
                  }}
                >
                  /Logout
                </div>
              </Row>
            </Col>
          </Row>
          <br />
          <br />

          <Row>
            <div id="img">
              <a id="logo" />
            </div>
          </Row>
          <br />
          <br />
          <Row>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <AddTodo />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <ListGroup activeKey={activeTodoId}>
                {todos !== null
                  ? todos.map((todo, index) => {
                      if (todos[index].mail === user.mail) {
                        return (
                          <ListGroup.Item
                            id={
                              !todo.completed
                                ? 'todoListItem'
                                : 'todoListItemCompleted'
                            }
                            action
                            key={todo.id}
                            onMouseOver={() => {
                              this.changeActiveTodo(todo.id);
                            }}
                            onMouseLeave={() => {
                              this.changeActiveTodo(null);
                            }}
                            onClick={() => {
                              this.props.history.push(`/todo-list/${todo.id}`);
                            }}
                          >
                            {Array.from(todo.title)
                              .filter((_, _i) => _i < 15)
                              .join('')}

                            <div id="todoIconsContainer">
                              <a style={{ marginRight: '4px' }}>{`000${
                                index + 1
                              }`}</a>
                              {todo.completed ? (
                                <CheckCircleFill
                                  size={20}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTodo(todo.id);
                                  }}
                                  color={'green'}
                                />
                              ) : (
                                <Circle
                                  size={20}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTodo(todo.id);
                                  }}
                                />
                              )}
                              {activeTodoId === todo.id ? (
                                <XCircleFill
                                  size={20}
                                  id="removeTodoIcon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeTodo(todo.id);
                                  }}
                                  color={'red'}
                                />
                              ) : (
                                <Circle id="removePlaceholderTodoIcon" />
                              )}
                            </div>
                          </ListGroup.Item>
                        );
                      } else {
                        return null;
                      }
                    })
                  : null}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <br />
              <InputGroup id="todoFilter">
                <Col id="todoCountContainer" xs={6} md={6}>
                  <Row id="todoCountRow">
                    <div id="todoText">todo</div>
                    <div id="count">
                      {
                        todos.filter(
                          (todo) => todo.mail === user.mail && !todo.completed
                        ).length
                      }
                    </div>
                    <div>items left</div>
                  </Row>
                </Col>
                <Col xs={6} md={6}>
                  <Row id="todoFilterRow">
                    <Col
                      id={
                        selectedFilter === 'allSelected' ? 'allSelected' : 'all'
                      }
                      xs={1}
                      md={1}
                      onClick={() => {
                        console.log(selectedFilter);
                        console.log('asdasdds');
                        if (selectedFilter === 'allSelected') {
                          this.setState({ selectedFilter: '' });
                        } else {
                          this.setState({ selectedFilter: 'allSelected' });
                        }
                      }}
                    >
                      All
                    </Col>
                    <Col
                      id={
                        selectedFilter === 'activeSelected'
                          ? 'activeSelected'
                          : 'active'
                      }
                      xs={3}
                      md={3}
                      onClick={() => {
                        if (selectedFilter === 'activeSelected') {
                          this.setState({ selectedFilter: '' });
                        } else {
                          this.setState({ selectedFilter: 'activeSelected' });
                        }
                      }}
                    >
                      Active
                    </Col>
                    <Col
                      id={
                        selectedFilter === 'completedSelected'
                          ? 'completedSelected'
                          : 'completed'
                      }
                      xs={6}
                      md={6}
                      onClick={() => {
                        if (selectedFilter === 'completedSelected') {
                          this.setState({ selectedFilter: '' });
                        } else {
                          this.setState({
                            selectedFilter: 'completedSelected',
                          });
                        }
                      }}
                    >
                      Completed
                    </Col>
                  </Row>
                </Col>
              </InputGroup>
            </Col>
          </Row>
          <br />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { todos, user } = state;
  return { todos, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id) => dispatch(toggleTodoAction(id)),
    removeTodo: (id) => dispatch(removeTodoAction(id)),
    resetUser: (history) => dispatch(resetUserAction(history)),
  };
};
const wrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
);

export default wrapper(Todos);
