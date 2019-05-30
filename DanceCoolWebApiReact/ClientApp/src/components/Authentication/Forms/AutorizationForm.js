import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AutorizationForm = (props) => {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={props.autEmailChanged}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={props.autPasswordChanged}/>
            </Form.Group>
        </Form>
    );
}

export default AutorizationForm;