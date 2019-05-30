import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import {
  Modal
  , ModalBody
  , ModalFooter
} from 'reactstrap';
import './AuthenticationModal.css';
import AutorizationForm from './Forms/AutorizationForm';
import RegistrationForm from './Forms/RegistrationForm';

export class AuthenticationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout:1500,
      authenticationButtonText: 'Увійти',
      
      regFirstName:'',
      regLastName:'',
      regPhoneNumber:'+380',
      regEmail:'',
      regPassword:'',
      regConfPassword:'',

      autEmail:'',
      autPassword:''
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
  }

  onRegFNInput = event => {
    console.log(event.target.value);
  }
  onRegLNInput = event => {
    console.log(event.target.value);
  }
  onPhonNumberInput = event => {
    console.log(event.target.value);
  }
  onRegEmailInput = event => {
    console.log(event.target.value);
  }
  onRegPasswordInput = event => {
    console.log(event.target.value);
  }
  onRegConfPasswordInput = event => {
    console.log(event.target.value);
  }

  onAutEmailInput = event => {
    console.log(event.target.value);
  }
  onAutPasswordInput = event => {
    console.log(event.target.value);
  }


  onAuthenticationSelectTab = (eventKey) => {
    if (eventKey === 'SignInTab') {
      this.setState({ authenticationButtonText: 'Увійти' });
    }
    if (eventKey === 'SignUpTab') {
      this.setState({ authenticationButtonText: 'Зареєструватися' });
    }
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
                InitPhoneText={this.state.regPhoneNumber}
                RegEmailChanged={this.onRegEmailInput}
                RegPasswordChanged={this.onRegPasswordInput}
                RegConfPasswordChanged={this.onRegConfPasswordInput}
                 />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" type="submit">
            {this.state.authenticationButtonText}
          </Button>
          <Button variant="secondary"
            onClick={this.props.close}>
            Закрити
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
