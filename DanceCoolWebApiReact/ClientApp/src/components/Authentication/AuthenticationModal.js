import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import {
  Modal
  , ModalBody
  , ModalFooter
} from 'reactstrap';
import AutorizationForm from './Forms/AutorizationForm';
import RegistrationForm from './Forms/RegistrationForm';

export class AuthenticationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticationButtonText: 'Увійти'
    }
    this.onAuthenticationSelectTab = this.onAuthenticationSelectTab.bind(this);
  }

  onAuthenticationSelectTab = key => {
    if (key === 'SignInTab') {
      this.setState({ AuthenticationButtonText: 'Увійти' });
    }
    if (key === 'SignUpTab') {
      this.setState({ AuthenticationButtonText: 'Зареєструватися' });
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.visible}
        onSelect={this.props.tabSwitching}>
        <ModalBody>
          <Tabs>
            <Tab eventKey='SignInTab' title="Авторизація">
              <AutorizationForm />
            </Tab>
            <Tab eventKey='SignUpTab' title="Реєстрація">
              <RegistrationForm />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary"
            onClick={this.props.close}>
            Закрити
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
