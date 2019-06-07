import React, { Component } from 'react';
import GroupTittle from '../components/GroupPage/GroupTittle';
import { connect } from 'react-redux';
import GroupStudentsList from '../components/GroupPage/GroupStudentsList';
import AddingStudentToGroupModal from '../components/GroupPage/AddingStudentToGroupModal/AddingStudentToGroupModal';
import EditGroup from '../components/GroupPage/EditingGroup'
import Axios from 'axios';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            group: {},
            skillLevels: [],
            mentors: [],
            newSkillLevelId: null,
            newPimMentorId: null,
            newSecMentorId: null,
            groupStudents: [],
            studentsNotInGroup: [],
            addingStudentToGroupModalVisible: false,
            editGroupModalVisible: false,
            requestHeader: ''
        }
        this.AddingStudenToGroupModalHandler = this.AddingStudenToGroupModalHandler.bind(AddingStudentToGroupModal);
        this.onChooseStudentNotInGroupTab = this.onChooseStudentNotInGroupTab.bind(AddingStudentToGroupModal);
    }

    componentDidMount() {
        this.populateCurrentGroupData();
        this.populateCurrentGroupStudentsData();
    }

    AddingStudenToGroupModalHandler = event => {
        if (this.state.addingStudentToGroupModalVisible === false) {
            this.setState({ addingStudentToGroupModalVisible: true });
        }
        else {
            this.setState({ addingStudentToGroupModalVisible: false });
        }
    }

    onChooseStudentNotInGroupTab = (key) => {
        if (key === 'ExistingStudents') {
            if (this.state.studentsNotInGroup.length < 1) {
                this.populateStudentsNotInCurrentGroup();
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Інформація про поточну групу</h1>
                {this.props.roleName === 'Admin' ?
                    <EditGroup group={this.state.group} /> :
                    <GroupTittle group={this.state.group} />
                }
                <br />
                <button className="btn btn-primary"
                    onClick={this.AddingStudenToGroupModalHandler}>Додати студента до групи</button>
                <GroupStudentsList groupStudents={this.state.groupStudents} />
                <AddingStudentToGroupModal visible={this.state.addingStudentToGroupModalVisible}
                    close={this.AddingStudenToGroupModalHandler}
                    selectStudentsNotInGroupTab={this.onChooseStudentNotInGroupTab}
                    studentsNotInGroup={this.state.studentsNotInGroup}
                    groupId={this.props.match.params.id}
                />
            </div>
        );
    }

    async populateCurrentGroupData() {
        const id = this.props.match.params.id;
        Axios.get(`api/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        })
            .then(response => this.setState({ group: response.data }))
            .catch(error => console.log(error))
            ;
    }

    async populateStudentsNotInCurrentGroup() {
        const id = this.props.match.params.id;
        Axios.get(`api/groups/${id}/students/not-in-group`, {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        })
            .then(response =>
                this.setState({ studentsNotInGroup: response.data }))
            .catch(error => { console.log(error) });
    }

    async populateCurrentGroupStudentsData() {
        const id = this.props.match.params.id;
        Axios.get(`api/groups/${id}/users/`, {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        }).then(response =>
            this.setState({
                groupStudents: response.data
            }))
            .catch(error => console.log(error));
    }

    async getAllSkillLevels() {
        Axios.get('api/skill-levels/')
            .then(response => this.setState({
                skillLevels: response.data
            }))
            .catch(error => console.log(error));
    }

    async getAllMentors() {
        Axios.get('api/mentors')
            .then(response => this.setState({
                mentors: response.data
            }))
            .catch(error => console.log(error));
    }

    async changeGroupLevel() {
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

    async changeGroupMentors() {
        const id = this.props.match.params.id;
        Axios.put('api/group/mentor', null, {
            params: {
                groupId: id,
                newPrimaryMentorId: this.state.newPimMentorId,
                newSecMentorId: this.state.newSecMentorId
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(GroupPage);