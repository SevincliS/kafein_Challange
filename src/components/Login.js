import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Envelope, Key } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setUserAction } from '../actions/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      alertShow: false,
    };
  }

  users = [
    {
      mail: 'semihsevincli@gmail.com',
      password: '1234',
    },
    {
      mail: 'semihsevincli@hotmail.com',
      password: '1234',
    },
  ];

  componentDidMount = () => {
    const { user, history } = this.props;
    if (user !== null && user.mail !== undefined) {
      history.push('/todo-list');
    }
  };

  Login = () => {
    const { mail, password } = this.state;
    const { setUser } = this.props;
    this.users.forEach((user) => {
      if (user.mail === mail && user.password === password) {
        setUser(mail);
        this.props.history.push('/todo-list');
      } else {
        this.setState({ alertShow: true });
      }
    });
  };

  render() {
    const { alertShow } = this.state;
    return (
      <Container>
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
              <InputGroup.Prepend id="mailIconContainer">
                <Envelope id="mailIcon" />
              </InputGroup.Prepend>
              <Form.Control
                id="loginInput"
                onChange={(e) => {
                  this.setState({ mail: e.target.value });
                }}
                type="email"
                placeholder="Enter email"
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Prepend id="keyIconContainer">
                <Key id="keyIcon" />
              </InputGroup.Prepend>
              <Form.Control
                id="loginPassword"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
            <br />
            <InputGroup id="loginBottomGroup">
              <Form.Check type="checkbox" label="Beni Hatırla" />
              <Button id="forgotPassword" variant="link">
                Şiftemi Unuttum
              </Button>
            </InputGroup>
            <br />

            {alertShow ? (
              <Alert variant="danger">
                Kullanıcı adınızı ve şifrenizi kontrol edip tekrar deneyin
                lütfen.
              </Alert>
            ) : null}

            <Button
              id="loginButton"
              onClick={(e) => {
                e.preventDefault();
                this.Login();
              }}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (name) => dispatch(setUserAction(name)),
  };
};

const wrapper = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default wrapper(Login);
