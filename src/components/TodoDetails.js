import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, InputGroup, Container, Col, Row } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { resetUserAction } from '../actions/user';

class TodoDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { user, history } = this.props;
    console.log(user.mail);
    if (user.mail === undefined) {
      history.push('/todo-list');
    }
  };

  goBack = () => {
    const { history } = this.props;
    history.push('/todo-list');
  };
  render() {
    const { todos, match, user, resetUser, history } = this.props;
    const { id } = match.params;
    const selectedTodo = todos.find((todo) => todo.id.toString() === id);
    return (
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
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form>
            <InputGroup>
              <Form.Control
                id="todoDetailsTitle"
                readOnly
                defaultValue={selectedTodo.title}
              />
            </InputGroup>

            <InputGroup>
              <Form.Control
                id="todoDetailsDesc"
                as="textarea"
                readOnly
                defaultValue={selectedTodo.text}
              />
            </InputGroup>
            <Button
              id="goBackButton"
              onClick={(e) => {
                e.preventDefault();
                this.goBack();
              }}
              type="submit"
            />
          </Form>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { todos, user } = state;
  return { todos, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUser: (history) => dispatch(resetUserAction(history)),
  };
};
const wrapper = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default wrapper(TodoDetails);
