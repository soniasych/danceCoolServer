import React, { Component } from 'react';
import { Container, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';
import Axios from 'axios';
import { connect } from 'react-redux';

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ableToEdit: false,
            newPrimMentorId: 0,
            newSecMentorId: 0,
            newSkillLevelId: 0,
            availableMentors: [],
            availableSkillLevels: []
        }
    }

    render() {
        return (
            <Container>
                <div className="row justify-content-md-left">
                    <div className="col-md-auto">
                        <h5>{this.props.group.groupDirection}</h5>
                    </div>
                    <div className="col-md-auto">
                        <DropdownButton
                            onClick={this.getAvailableAllSkillLevels}
                            title={this.props.group.groupLevel}
                            variant='outline-secondary'>
                            {this.state.availableSkillLevels.map(skillLevel =>
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
                        onClick={this.getAvailableMentors}
                        id="dropdown-basic-button"
                        title={this.props.group.primaryMentor}>
                        {this.state.availableMentors.map(
                            mentor => <Dropdown.Item key={mentor.id}>
                                {mentor.firstName} {mentor.lastName}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                    <br />
                    <DropdownButton
                        onClick={this.getAvailableMentors}
                        id="dropdown-basic-button"
                        title={this.props.group.secondaryMentor}>
                        {this.state.availableMentors.map(
                            mentor => <Dropdown.Item key={mentor.id}>
                                {mentor.firstName} {mentor.lastName}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                </ButtonToolbar>
            </Container >
        );
    }

    getAvailableAllSkillLevels() {
        Axios.get('api/skill-levels/')
            .then(response => this.setState({
                availableSkillLevels: response.data
            }))
            .catch(error => console.log(error));
    }


    getAvailableMentors = () => {
        let groupId = this.props.group.groupId;

        Axios.get(`api/groups/${groupId}/mentors/not-in-group`, {
            params: {
                primMentor: this.props.group.primaryMentorId,
                secMentor: this.props.group.secondaryMentorId
            }, headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        })
            .then(response => this.setState({
                availableMentors: response.data
            })).catch(error => console.log(error));
    }

    changeGroupLevel() {
        const id = this.props.match.params.id;
        Axios.put('api/group/skill-level/',
            {
                params: {
                    groupId: id,
                    newSkillLevelId: this.state.newSkillLevelId
                }
            })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    changeGroupMentors() {
        const id = this.props.match.params.id;
        Axios.put('api/group/mentor', null, {
            params: {
                groupId: id,
                newPrimaryMentorId: this.state.newPrimMentorId,
                newSecMentorId: this.state.newSecMentorId
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token
    };
};

export default connect(mapStateToProps)(EditGroup);
