import React, { Component } from 'react';
import { Container, ButtonToolbar, Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import './EditGroup.css';
class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ableToEdit: false,
            changesBeenMade: false,
            skillLevelDropDownOpen: false,
            // newPrimMentorId: 0,
            // newSecMentorId: 0,
            newSkillLevelId: 0,
            newSkillLevelName: '',
            newPrimaryMentor: {},
            newSecondaryMentor: {},
            availableMentors: [],
            availableSkillLevels: []
        };
        this.enableEditGroup = this.enableEditGroup.bind(this);
        this.onSelectedSkillLevel = this.onSelectedSkillLevel.bind(this);
        this.confirmChanges = this.confirmChanges.bind(this);
    }

    componentDidMount() {
        this.setState({
            newSkillLevelName: this.props.group.groupLevel,
        });
    }

    onSelectedSkillLevel(event) {
        let newSkillLevel = this.state.availableSkillLevels.find(skillLevel => skillLevel.name === event.target.value);
        console.log(newSkillLevel);
        this.setState({
             newSkillLevelName:newSkillLevel.name,
             newSkillLevelId:newSkillLevel.id
        });
    }

    confirmChanges = () => {
        this.changeGroupLevel();
        this.setState({ ableToEdit: false });
    }

    enableEditGroup(event) {
        this.getAvailableSkillLevels();
        this.setState({
            ableToEdit: true,
            newPrimMentorId: this.props.group.primaryMentorId,
            newSecMentorId: this.props.group.secondaryMentorId,
            newSkillLevelName: this.props.group.groupLevel,
            newPrimaryMentor: {
                id: this.props.group.primaryMentorId,
                firstName: this.props.group.primaryMentorFirstName,
                lastName: this.props.group.primaryMentorLastName
            },
            newSecondaryMentor: {
                id: this.props.group.secondaryMentorId,
                firstName: this.props.group.secondaryMentorFirstName,
                lastName: this.props.group.secondaryMentorLastName
            }
        });
    }

    render() {
        return (
            <Container>
                <div className="row justify-content-md-left">
                    <div className="col-md-auto">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Example select</Form.Label>
                            <Form.Control as="select"
                            disabled={!this.state.ableToEdit}
                            value={this.state.newSkillLevelName}
                            onChange={this.onSelectedSkillLevel}>
                                {this.state.availableSkillLevels.map(skillLevel=>
                                <option key={skillLevel.id}>
                                {skillLevel.name}
                                </option>)}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <br />
                <label>Наставники</label>
                <br />
                <ButtonToolbar className="btn-toolbar mb-3">
                    <Button
                        onClick={this.enableEditGroup}
                    >Змінити групу
                    </Button>
                    <Button disabled={(this.state.newSkillLevelName === this.props.group.groupLevel)}
                        onClick={this.confirmChanges}>
                        Підтвердити зміни
                        </Button>
                </ButtonToolbar>
            </Container >
        );
    }

    getAvailableSkillLevels() {
        Axios.get('api/skill-levels/')
            .then(response => this.setState({
                availableSkillLevels: response.data
            }))
            .catch(error => console.log(error));
    }

    getAvailableMentors = () => {
        let groupId = this.props.group.groupId;
        console.log(this.state.newPrimaryMentor.id, this.state.newSecondaryMentor.id);

        Axios.get(`api/groups/${groupId}/mentors/not-in-group`, {
            params: {
                primMentor: this.state.newPrimaryMentor.id,
                secMentor: this.state.newSecondaryMentor.id
            }
        })
            .then(response => this.setState({
                availableMentors: response.data
            })).catch(error => console.log(error));
    }

    changeGroupLevel() {
        Axios.put('api/group/skill-level', {
                groupId: this.props.group.groupId,
                newSkillLevelId: this.state.newSkillLevelId
        }, {
                headers: {
                    Authorization: `Bearer ${this.props.access_token}`
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
                newPrimaryMentorId: this.state.newPrimaryMentor.id,
                newSecMentorId: this.state.newSecondaryMentor.id
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
