import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LogInForm = (props) => {
    return (
        <Form typeof="submit">
            <Form.Group controlId="formBasicEmail" className={``}>
                <Form.Label>Електронна пошта</Form.Label>
                <Form.Control                    
                    type="email"
                    name="autEmail"
                    onChange={props.autEmailChanged} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className={``}>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    name="autPassword"
                    onChange={props.autPasswordChanged} />
            </Form.Group>
        </Form>
    );
}

export default LogInForm;