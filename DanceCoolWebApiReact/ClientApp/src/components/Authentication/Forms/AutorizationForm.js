import React from 'react';
import { Form } from 'react-bootstrap';

const AutorizationForm = (props) => {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Електронна пошта</Form.Label>
                <Form.Control
                type="email"
                onChange={props.autEmailChanged}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control 
                type="password" 
                onChange={props.autPasswordChanged}/>
            </Form.Group>
        </Form>
    );
}

export default AutorizationForm;