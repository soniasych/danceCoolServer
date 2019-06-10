import React from 'react';
import { Container, ButtonToolbar, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';

const EditGroup = (props) => {
    const group = props.group;
    const mentors = props.mentors;
    return (
        <Container>
            <div class="row justify-content-md-left">
                <div className="col-md-auto">
                    <h5>{group.groupDirection}</h5>
                </div>
                <div className="col-md-auto">
                    <DropdownButton
                        title={group.groupLevel}
                        variant='outline-secondary'>
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Active Item</Dropdown.Item>
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <br />
            <label>Наставники</label>
            <ButtonToolbar>
                <DropdownButton id="dropdown-basic-button" title={group.primaryMentor}>
                    {mentors.map(
                        mentor => <Dropdown.Item key={mentor.id}>
                            {mentor.firstName}
                        </Dropdown.Item>
                    )}
                </DropdownButton>
                <br />
                <DropdownButton
                    title={group.secondaryMentor}
                    variant='outline-secondary'>
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                        Active Item
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>

            </ButtonToolbar>
        </Container >
    );
}

export default EditGroup;