import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class LogInForm extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Електронна пошта</Form.Label>
                    <Form.Control
                        type="email"
                        value="rgosling@mail.com"
                        onChange={this.props.autEmailChanged} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={this.props.autPasswordChanged} />
                </Form.Group>
            </Form>
        );
    }
}

export default LogInForm;