import React, { Component } from 'react';
import GroupTittle from '../components/GroupPage/GroupTittle';
import { connect } from 'react-redux';
import GroupStudentsList from '../components/GroupPage/GroupStudentsList';
import AddingStudentToGroupModal from '../components/GroupPage/AddingStudentToGroupModal/AddingStudentToGroupModal';
import EditGroup from '../components/GroupPage/EditGroup/EditingGroup'
import Axios from 'axios';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            group: {},
            groupStudents: [],
            studentsNotInGroup: [],
            addingStudentToGroupModalVisible: false
        }
        this.AddingStudenToGroupModalHandler = this.AddingStudenToGroupModalHandler.bind(AddingStudentToGroupModal);
        this.onChooseStudentNotInGroupTab = this.onChooseStudentNotInGroupTab.bind(AddingStudentToGroupModal);
    }

    componentDidMount() {
        this.populateCurrentGroupData();
        this.populateCurrentGroupStudentsData();
        this.setState({
            newPimMentorId: this.state.group.primaryMentorId,
            newSecMentorId: this.state.group.secondaryMentorId,
            
        });
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
                <br />
                {this.props.roleName === 'Admin' ?
                    <EditGroup
                        group={this.state.group}
                        groupLevel={this.state.group.groupLevel}
                    /> :
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
            .then(() => this.setState({
                newPrimMentorId: this.state.group.primaryMentorId,
                newSecMentorId: this.state.group.secondaryMentorId,
            }))
            .catch(error => console.log(error));
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

    
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(GroupPage);