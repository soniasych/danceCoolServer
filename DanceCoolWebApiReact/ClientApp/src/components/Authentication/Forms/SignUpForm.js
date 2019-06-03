import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SignUpForm = (props) => {
    return (<Form>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>Ім'я</Form.Label>
                <Form.Control type="text" placeholder="Ім'я" onChange={props.FNChanged}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail" onChange={props.RegEmailChanged}>
                <Form.Label>Електронна пошта</Form.Label>
                <Form.Control type="email" />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Прізвище</Form.Label>
                <Form.Control type="text" placeholder="Прізвище" onChange={props.LNChanged} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Пароль" onChange={props.RegPasswordChanged} />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridPhoneNumber">
                <Form.Label>Номер телефону</Form.Label>
                <Form.Control type="text" placeholder="Номер телефону" onChange={props.PhoneChanged} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Підтвердіть Пароль</Form.Label>
                <Form.Control type="password" placeholder="Підтвердження Паролю" onChange={props.RegConfPasswordChanged} />
            </Form.Group>
        </Form.Row>
    </Form>);

}

export default SignUpForm;