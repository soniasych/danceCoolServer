import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LogInForm = (props) => {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail" typeof="subimt">
                <Form.Label>Електронна пошта</Form.Label>
                <Form.Control
                    type="email"
                    value="gosling@mail.com"
                    onChange={props.autEmailChanged} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    onChange={props.autPasswordChanged} />
            </Form.Group>
        </Form>
    );
}

export default LogInForm;