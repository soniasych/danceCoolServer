import React, { Component } from 'react';
import { Container, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

class EditGroup extends Component {
    constructor(props){
        super(props);
        this.state={
            group: props.group,
            skillLevels: props.skillLevels
        }
    }
    
    render() {
        return (
            <Container>
                <div className="row justify-content-md-left">
                    <div className="col-md-auto">
                        <h5>{this.state.group.groupDirection}</h5>
                    </div>
                    <div className="col-md-auto">
                        <DropdownButton
                            title={this.state.group.groupLevel}
                            variant='outline-secondary'>
                            {this.state.skillLevels.map(skillLevel =>
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
                        onClick={this.props.getAvailableMentors}
                        id="dropdown-basic-button"
                        title={this.props.curPrimeMentor}>
                        {this.props.availableMentors.map(
                            mentor => <Dropdown.Item key={mentor.id}>
                                {mentor.firstName} {mentor.lastName}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                    <br />
                    <DropdownButton
                        onClick={this.props.getAvailableMentors}
                        id="dropdown-basic-button"
                        title={this.props.curSecMentor}>
                        {this.props.availableMentors.map(
                            mentor => <Dropdown.Item key={mentor.id}>
                                {mentor.firstName} {mentor.lastName}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                </ButtonToolbar>
            </Container >
        );
    }
}

export default EditGroup;