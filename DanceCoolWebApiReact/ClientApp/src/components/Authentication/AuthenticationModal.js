import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import {
  Modal
  , ModalBody
  , ModalFooter
} from 'reactstrap';
import Axios from 'axios';
import './AuthenticationModal.css';
import AutorizationForm from './Forms/AutorizationForm';
import RegistrationForm from './Forms/RegistrationForm';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

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
      autEmail: 'gosling@mail.com',
      autPassword: 'LaLaLand'
    }
    this.onAuthenticationSelectTab = this.onAuthenticationSelectTab.bind(this);

    this.onRegFNInput = this.onRegFNInput.bind(RegistrationForm);
    this.onRegLNInput = this.onRegLNInput.bind(RegistrationForm);
    this.onPhonNumberInput = this.onPhonNumberInput.bind(RegistrationForm);
    this.onRegEmailInput = this.onRegEmailInput.bind(RegistrationForm);
    this.onRegPasswordInput = this.onRegPasswordInput.bind(RegistrationForm);
    this.onRegConfPasswordInput = this.onRegConfPasswordInput.bind(RegistrationForm);
    this.onAutEmailInput = this.onAutEmailInput.bind(AutorizationForm);
    this.onAutPasswordInput = this.onAutPasswordInput.bind(AutorizationForm);
    this.registerRequest = this.registerRequest.bind(this);
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

  registerRequest(event) {
    let registrationData = {
      firstName: this.state.regFirstName,
      lastName: this.state.regLastName,
      email: this.state.regEmail,
      phoneNumber: this.state.regPhoneNumber,
      password: this.state.regPassword
    }
    Axios.post('api/register', registrationData);
    event.preventDefault();
  }

  render() {
    return (
      <Modal isOpen={this.props.visible}
        className="my-modal">
        <ModalBody>
          <Tabs onSelect={this.onAuthenticationSelectTab}>
            <Tab eventKey="SignInTab" title="Авторизація">
              <AutorizationForm
                autEmailChanged={this.onAutEmailInput}
                autPasswordChanged={this.onAutPasswordInput} />
            </Tab>
            <Tab eventKey="SignUpTab" title="Реєстрація">
              <RegistrationForm submitButtonText={this.state.authenticationButtonText}
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
          <Button variant="primary"
            type="submit"
            onClick={this.state.activeTabKey === 'SignInTab' ?
              () => this.props.onAuthorize(this.state.autEmail, this.state.autPassword) :
              this.props.onRegister(this.state.regFirstName,
              this.state.regLastName, 
              this.state.regPhoneNumber,
              this.state.regEmail,
              this.state.regPassword)}>
            {this.state.authenticationButtonText}
          </Button>
          <Button variant="secondary"
            onClick={(this.props.close)}>
            Закрити
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (firstName, lastName, phoneNumber, email, password) => 
      dispatch(actions.onSignUp(firstName, lastName, phoneNumber, email, password)),
    //onRegister: (firstName, lastName, phoneNumber, email, password) => 
      //dispatch(register(firstName, lastName, phoneNumber, email, password)),
      //onLogout:()=>(logOut())
  };
};


export default connect(null, mapDispatchToProps)(AuthenticationModal);
