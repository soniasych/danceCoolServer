import React from 'react';
import { Container, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

const EditGroup = (props) => {
    const group = props.group;
    const mentors = props.mentors;
    const skillLevels = props.skillLevels;
    return (
        <Container>
            <div className="row justify-content-md-left">
                <div className="col-md-auto">
                    <h5>{group.groupDirection}</h5>
                </div>
                <div className="col-md-auto">
                    <DropdownButton
                        title={group.groupLevel}
                        variant='outline-secondary'>
                        {skillLevels.map(skillLevel =>
                            <Dropdown.Item key={skillLevel.id}>
                                {skillLevel.name}
                            </Dropdown.Item>)}
                    </DropdownButton>
                </div>
            </div>
            <br />
            <label>Наставники</label>
            <ButtonToolbar>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={group.primaryMentor}>
                    {mentors.map(
                        mentor => <Dropdown.Item key={mentor.id}>
                            {mentor.firstName} {mentor.lastName}
                        </Dropdown.Item>
                    )}
                </DropdownButton>
                <br />
                <DropdownButton
                    id="dropdown-basic-button"
                    title={group.secondaryMentor}>
                    {mentors.map(
                        mentor => <Dropdown.Item key={mentor.id}>
                            {mentor.firstName} {mentor.lastName}
                        </Dropdown.Item>
                    )}
                </DropdownButton>
            </ButtonToolbar>
        </Container >
    );
}

export default EditGroup;