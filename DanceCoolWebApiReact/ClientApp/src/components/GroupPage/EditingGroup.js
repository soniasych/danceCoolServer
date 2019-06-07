import React from 'react';
import { Container } from 'react-bootstrap';

const EditGroup = (props) => {
    const group = props.group;
    return (
        <Container>
            <label>Наставники
                <div>
                    <select className="custom-select">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div>
                    <select className="custom-select">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </label>
        </Container>)
}

export default EditGroup;