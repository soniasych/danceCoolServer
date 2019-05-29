import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const RegistrationForm = (props) => {
    return (<Form>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
        </Form.Row>

        <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>Ім'я</Form.Label>
                <Form.Control type="text" placeholder="Ім'я" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Прізвище</Form.Label>
                <Form.Control type="text" placeholder="Прізвище" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhoneNumber">
                <Form.Label>Номер телефону</Form.Label>
                <Form.Control type="text" placeholder="Номер телефону" />
            </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
            Зареєструватися
        </Button>
    </Form>);

}

export default RegistrationForm;