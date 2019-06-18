import React, { Component } from 'react';
import { Container, ButtonToolbar, Button, Form, InputGroup } from 'react-bootstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import './EditGroup.css';

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ableToEdit: false,
            editProcessBegan: false,
            newPrimMentorId: 0,
            newSecMentorId: 0,
            newSkillLevelId: 0,
            availableMentors: [],
            availableSkillLevels: []
        };
        this.enableEditGroup = this.enableEditGroup.bind(this);
        this.onSelectedSkillLevel = this.onSelectedSkillLevel.bind(this);
        this.confirmChanges = this.confirmChanges.bind(this);
        this.onSelectedPrimaryMentor = this.onSelectedPrimaryMentor.bind(this);
        this.onSelectedSecondaryMentor = this.onSelectedSecondaryMentor.bind(this);
    }

    componentDidMount() {
        this.getAvailableSkillLevels();
        this.setState({
            newSkillLevelName: this.props.group.groupLevel
        });

    }

    enableEditGroup(event) {
        //this.getAvailableSkillLevels();
        this.getAvailableMentors();

        this.setState({
            ableToEdit: true,
            newPrimMentorId: this.props.group.primaryMentorId,
            newSecMentorId: this.props.group.secondaryMentorId,
            newSkillLevelName: this.props.group.groupLevel
        });
    }

    onSelectedSkillLevel(event) {
        let selectedIndex = event.target.options.selectedIndex;
        let newSkillLevelid = event.target.options[selectedIndex].getAttribute('levelid');
        this.setState({
            newSkillLevelName: event.target.value,
            newSkillLevelId: newSkillLevelid
        });
    }

    onSelectedPrimaryMentor(event) {
        let selectedIndex = event.target.options.selectedIndex;
        let newPrimMentorId = event.target.options[selectedIndex].getAttribute('primmentorid');
        this.setState({
            newPrimMentorId: newPrimMentorId
        });
    }

    onSelectedSecondaryMentor(event) {
        let selectedIndex = event.target.options.selectedIndex;
        let newSecMentorId = event.target.options[selectedIndex].getAttribute('secmentorid');
        this.setState({
            newSecMentorId: newSecMentorId
        });
    }

    confirmChanges() {
        if (this.state.newSkillLevelName !== this.props.group.groupLevel) {
            this.changeGroupLevel();
        }

        if (this.state.newPrimMentorId !== this.props.group.primaryMentorId
            || this.state.newSecMentorId === this.props.group.secondaryMentorId) {
            this.changeGroupMentors();
        }
        this.setState({ ableToEdit: false });
    }

    render() {
        return (
            <Container>
                <div className="row justify-content-md-left">
                    <div className="col-md-auto">
                        <Form.Group controlId="getGroupLevel">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text >{this.props.group.groupDirection}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" className="custom-select"
                                    disabled={!this.state.ableToEdit}
                                    onChange={this.onSelectedSkillLevel}>
                                    <option selected>
                                        {`${this.props.groupLevel}`}
                                    </option>
                                    {this.state.availableSkillLevels.map(skillLevel =>
                                        <option
                                            key={skillLevel.id}
                                            levelid={skillLevel.id}>
                                            {skillLevel.name}
                                        </option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </div>
                <div className="row justify-content-md-left">
                    <div className="col-md-6">
                        <Form.Group controlId="getGroupMentors">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text >Наставники</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" className="custom-select"
                                    disabled={!this.state.ableToEdit}
                                    onChange={this.onSelectedPrimaryMentor}>
                                    <option selected>
                                        {`${this.props.group.primaryMentorFirstName} ${this.props.group.primaryMentorLastName}`}
                                    </option>
                                    {this.state.availableMentors.map(primaryMentor =>
                                        <option key={primaryMentor.id}
                                            primmentorid={primaryMentor.id}>
                                            {`${primaryMentor.firstName} ${primaryMentor.lastName}`}
                                        </option>)}
                                </Form.Control>
                                <Form.Control as="select" className="custom-select"
                                    disabled={!this.state.ableToEdit}
                                    onChange={this.onSelectedSecondaryMentor}>
                                    <option selected>{`${this.props.group.secondaryMentorFirstName} ${this.props.group.secondaryMentorLastName}`}</option>
                                    {this.state.availableMentors.map((secondaryMentor, key) =>
                                        <option key={secondaryMentor.id}
                                            secmentorid={secondaryMentor.id}>
                                            {`${secondaryMentor.firstName} ${secondaryMentor.lastName}`}
                                        </option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </div>
                <ButtonToolbar className="btn-toolbar mb-3">
                    <Button
                        onClick={this.enableEditGroup}
                    >Змінити групу
                    </Button>
                    <Button disabled={(this.state.newSkillLevelName === this.props.group.groupLevel
                        && this.state.newPrimMentorId === this.props.group.primaryMentorId
                        && this.state.newSecMentorId === this.props.group.secondaryMentorId)}
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

    getAvailableMentors() {
        let config = {
            headers: { 'Authorization': `Bearer ${this.props.access_token}` },
            params: {
                primMentorId: this.props.group.primaryMentorId,
                secMentorId: this.props.group.secondaryMentorId
            },
        }
        Axios.get(`api/groups/${this.props.group.groupId}/mentors/not-in-group`, config)
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
        const id = this.props.group.groupId;
        Axios.put('api/group/mentor', {
            groupId: id,
            newPrimaryMentorId: this.state.newPrimMentorId,
            newSecMentorId: this.state.newSecMentorId
        }, {
                headers: {
                    Authorization: `Bearer ${this.props.access_token}`
                }
            }
        )
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
