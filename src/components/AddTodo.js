import React, { Component } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { Plus, Dash } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { addTodoAction } from '../actions/todos';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false,
      text: '',
      title: '',
      alertShow: false,
    };
  }

  render() {
    const { details, title, text, alertShow } = this.state;
    const { addTodo, user } = this.props;
    const { mail } = user;
    return (
      <Form>
        <InputGroup>
          <Form.Control
            id={!details ? 'addTodoInput' : 'addtodoInputOpenDetais'}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            placeholder="What needs to be done ?"
          />
          <InputGroup.Append
            id={
              !details
                ? 'addTodoDetailsIconContainer'
                : 'addTodoDetailsOpenIconContainer'
            }
            onClick={() => {
              this.setState((prevState) => ({
                details: !prevState.details,
              }));
            }}
          >
            {!details ? (
              <Plus
                id="addTodoDetailsIcon"
                onClick={() => {
                  this.setState((prevState) => ({
                    details: !prevState.details,
                  }));
                }}
              />
            ) : (
              <Dash
                id="addTodoCloseDetailsIcon"
                onClick={() => {
                  this.setState((prevState) => ({
                    details: !prevState.details,
                  }));
                }}
              />
            )}
          </InputGroup.Append>
        </InputGroup>
        {details ? (
          <Form.Control
            as="textarea"
            id="todoDetailsInput"
            onChange={(e) => {
              this.setState({ text: e.target.value });
            }}
            placeholder="Please write brief description about your todo."
          />
        ) : null}
        <Button
          id="addTodoButton"
          onClick={(e) => {
            e.preventDefault();
            if (title !== '' && text !== '') {
              addTodo({ title, text, mail });
              this.setState({ alertShow: false });
            } else {
              this.setState({ alertShow: true });
            }
          }}
          type="submit"
        />
        {alertShow ? (
          <>
            <Alert variant="danger">
              Lütfen bir başlık ve açıklama giriniz.
            </Alert>
            <br />
          </>
        ) : null}
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  const { todos, user } = state;
  return { todos, user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodoAction(todo)),
  };
};
const wrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
);

export default wrapper(AddTodo);
