import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import {
  Modal
  , ModalBody
  , ModalFooter
} from 'reactstrap';
import './AuthenticationModal.css';
import { withRouter } from 'react-router'
import LogInForm from './Forms/LogInForm';
import SignUpForm from './Forms/SignUpForm';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';

class AuthenticationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticationButtonText: 'Увійти',
      activeTabKey: 'SignInTab',
      regFirstName: '',
      regLastName: '',
      regPhoneNumber: '',
      regEmail: '',
      regPassword: '',
      regConfPassword: '',
      autEmail: '',
      autPassword: ''
    }
    this.onAuthenticationSelectTab = this.onAuthenticationSelectTab.bind(this);

    this.onRegFNInput = this.onRegFNInput.bind(SignUpForm);
    this.onRegLNInput = this.onRegLNInput.bind(SignUpForm);
    this.onPhonNumberInput = this.onPhonNumberInput.bind(SignUpForm);
    this.onRegEmailInput = this.onRegEmailInput.bind(SignUpForm);
    this.onRegPasswordInput = this.onRegPasswordInput.bind(SignUpForm);
    this.onRegConfPasswordInput = this.onRegConfPasswordInput.bind(SignUpForm);
    this.onAutEmailInput = this.onAutEmailInput.bind(LogInForm);
    this.onAutPasswordInput = this.onAutPasswordInput.bind(LogInForm);
    this.onAuthenticateClick = this.onAuthenticateClick.bind(this);
  }

  onRegFNInput = event => {
    this.setState({ regFirstName: event.target.value });
  }
  onRegLNInput = event => {
    this.setState({ regLastName: event.target.value });
  }
  onPhonNumberInput = event => {
    this.setState({ regPhoneNumber: event.target.value });
  }
  onRegEmailInput = event => {
    this.setState({ regEmail: event.target.value });
  }
  onRegPasswordInput = event => {
    this.setState({ regPassword: event.target.value });
  }
  onRegConfPasswordInput = event => {
    this.setState({ regConfPassword: event.target.value });
  }

  onAutEmailInput = event => {
    this.setState({ autEmail: event.target.value });
  }

  onAutPasswordInput = event => {
    this.setState({ autPassword: event.target.value });
  }

  onAuthenticationSelectTab = (eventKey) => {
    if (eventKey === 'SignInTab') {
      this.setState({
        authenticationButtonText: 'Увійти',
        activeTabKey: eventKey
      });
    }
    if (eventKey === 'SignUpTab') {
      this.setState({
        authenticationButtonText: 'Зареєструватися',
        activeTabKey: eventKey
      });
    }
  }

  onAuthenticateClick = () => {
    if (this.state.activeTabKey === 'SignInTab') {
      this.props.onSignIn(this.state.autEmail, this.state.autPassword);
    } else {
      console.log(this.props);
      this.props.onSignUp(this.state.regFirstName,
        this.state.regLastName,
        this.state.regPhoneNumber,
        this.state.regEmail,
        this.state.regPassword)
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.visible}
        className="my-modal">
        <ModalBody>
          <Tabs onSelect={this.onAuthenticationSelectTab}
            defaultActiveKey="SignInTab">
            <Tab eventKey="SignInTab" title="Авторизація">
              <LogInForm
                autEmailChanged={this.onAutEmailInput}
                autPasswordChanged={this.onAutPasswordInput} />
            </Tab>
            <Tab eventKey="SignUpTab" title="Реєстрація">
              <SignUpForm
                submitButtonText={this.state.authenticationButtonText}
                FNChanged={this.onRegFNInput}
                LNChanged={this.onRegLNInput}
                PhoneChanged={this.onPhonNumberInput}
                RegEmailChanged={this.onRegEmailInput}
                RegPasswordChanged={this.onRegPasswordInput}
                RegConfPasswordChanged={this.onRegConfPasswordInput}
              />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            type="submit"
            onClick={this.onAuthenticateClick}>
            {this.state.authenticationButtonText}
          </Button>
          <Button variant="secondary"
            onClick={(this.props.close)}>
            Закрити
          </Button>
        </ModalFooter>
      </Modal >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (firstName, lastName, phoneNumber, email, password) =>
      dispatch(actionsTypes.SignUp(firstName, lastName, phoneNumber, email, password)),
    onSignIn: (email, password) =>
      dispatch(actionsTypes.LogIn(email, password))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthenticationModal));
