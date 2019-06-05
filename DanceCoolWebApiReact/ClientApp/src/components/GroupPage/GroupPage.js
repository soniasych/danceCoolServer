import React, { Component } from 'react';
import GroupTittle from './GroupTittle';
import { connect } from 'react-redux';
import GroupStudentsList from './GroupStudentsList';
import AddingStudentToGroupModal from './AddingStudentToGroupModal/AddingStudentToGroupModal';
import { EditGroupModal } from './EditGroupModal/EditGroupModal';
import Axios from 'axios';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            group: {},
            groupStudents: [],
            studentsNotInGroup: [],
            addingStudentToGroupModalVisible: false,
            editGroupModalVisible: false,
            requestHeader: ''
        }
        this.AddingStudenToGroupModalHandler = this.AddingStudenToGroupModalHandler.bind(AddingStudentToGroupModal);
        this.onAddNewStudentButtonClickHandler = this.onAddNewStudentButtonClickHandler.bind(AddingStudentToGroupModal);
        this.onChooseStudentNotInGroupTab = this.onChooseStudentNotInGroupTab.bind(AddingStudentToGroupModal);
        this.OpenEditGroupModalHandler = this.OpenEditGroupModalHandler.bind(this);
        this.CloseEditGroupModalHandler = this.CloseEditGroupModalHandler.bind(EditGroupModal);
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

    OpenEditGroupModalHandler = () => {
        if (this.state.editGroupModalVisible === false) {
            this.setState({ editGroupModalVisible: true });
        }
    }

    CloseEditGroupModalHandler = () => {
        if (this.state.editGroupModalVisible === true) {
            this.setState({ editGroupModalVisible: false });
        }
    }

    onChooseStudentNotInGroupTab = (key) => {
        if (key === 'ExistingStudents') {
            if (this.state.studentsNotInGroup.length < 1) {
                this.populateStudentsNotInCurrentGroup();
            }
        }
    }

    onAddNewStudentButtonClickHandler = event => {
        if (this.state.studentFirstName >= 1 &&
            this.state.studentLastName >= 1 &&
            this.state.studentPhoneNumber >= 1) {
            this.addStudent();
        }
        const addedStudent = {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            phoneNumber: this.state.studentPhoneNumber
        };

        Axios.post('api/users/', addedStudent)
            .then(response => console.log(response));

        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <h1>Інформація про поточну групу</h1>
                <GroupTittle group={this.state.group} />
                <br />
                {this.props.roleName === "Admin" ?
                    <button className="btn btn-primary"
                        onClick={this.OpenEditGroupModalHandler}>Редагувати групу</button>
                    : null
                }
                <button className="btn btn-primary"
                    onClick={this.AddingStudenToGroupModalHandler}>Додати студента до групи</button>
                <GroupStudentsList groupStudents={this.state.groupStudents} />
                <AddingStudentToGroupModal visible={this.state.addingStudentToGroupModalVisible}
                    close={this.AddingStudenToGroupModalHandler}
                    selectStudentsNotInGroupTab={this.onChooseStudentNotInGroupTab}
                    studentsNotInGroup={this.state.studentsNotInGroup}
                    addNewStudent={this.onAddNewStudentButtonClickHandler}
                    groupId={this.props.match.params.id}
                />
                <EditGroupModal
                    editGroupVisible={this.state.editGroupModalVisible}
                    closeEditModal={this.CloseEditGroupModalHandler}
                    initialgroupState={this.state.group}
                />
            </div>
        );
    }

    async populateCurrentGroupData() {
        const id = this.props.match.params.id;
        const responce = await Axios.get(`api/groups/${id}`);
        const data = await responce.data;
        this.setState({ group: data });
    }

    async populateStudentsNotInCurrentGroup() {
        const id = this.props.match.params.id;
        Axios.get(`api/groups/${id}/students/notingroup`, {
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
        const responce = await Axios.get(`api/groups/${id}/users/`);
        const data = await responce.data;
        this.setState({ groupStudents: data });
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};


export default connect(mapStateToProps)(GroupPage);