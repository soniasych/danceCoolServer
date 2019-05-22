import React, { Component } from 'react';
import GroupTittle from './GroupTittle';
import GroupStudentsList from './GroupStudentsList';
import AddingStudentToGroupModal from './AddingStudentToGroupModal/AddingStudentToGroupModal';
import Axios from 'axios';

export class GroupPage extends Component {
    static displayName = GroupPage.name;

    constructor(props) {
        super(props);
        this.state = {
            group: {},
            allStudetns: [],
            groupStudents: [],
            addingStudentToGroupModalVisible: false
        }
        this.AddingStudenToGroupModalHandler = this.AddingStudenToGroupModalHandler.bind(AddingStudentToGroupModal);
        this.onAddNewStudentButtonClickHandler = this.onAddNewStudentButtonClickHandler.bind(AddingStudentToGroupModal);
    }

    componentDidMount() {
        this.populateCurrentGroupData();
        this.populateCurrentGroupStudentsData();
        this.populateStudentsData();
    }

    AddingStudenToGroupModalHandler = event => {
        if (this.state.addingStudentToGroupModalVisible === false) {
            this.setState({ addingStudentToGroupModalVisible: true });
        }
        else {
            this.setState({ addingStudentToGroupModalVisible: false });
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
            <div>
                <h1>Current Group Info</h1>
                <GroupTittle group={this.state.group} />
                <br />
                <button className="btn btn-primary"
                    onClick={this.AddingStudenToGroupModalHandler}>Додати студента до групи</button>
                <GroupStudentsList groupStudents={this.state.groupStudents} />
                <AddingStudentToGroupModal visible={this.state.addingStudentToGroupModalVisible}
                    close={this.AddingStudenToGroupModalHandler}
                    allStudents={this.state.allStudetns}
                    addNewStudent={this.onAddNewStudentButtonClickHandler} />
            </div>
        );
    }

    async populateCurrentGroupData() {
        const id = this.props.match.params.id;
        const responce = await Axios.get(`api/groups/${id}`);
        const data = await responce.data;
        this.setState({ group: data });
    }

    async populateStudentsData() {
        const responce = await Axios.get(`api/students`);
        const data = await responce.data;
        this.setState({ allStudetns: data });
    }

    async populateCurrentGroupStudentsData() {
        const id = this.props.match.params.id;
        const responce = await Axios.get(`api/groups/${id}/users/`);
        const data = await responce.data;
        console.log(data);
        this.setState({ groupStudents: data });
    }
}