import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import './AddingStudentToGroupModal.css';
import Axios from 'axios';

export class ExistingSudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStudentSelected: false,
            selectedStudent: {},
            selectedStudentId: -1
        };
        this.addingStudentToGroup = this.addingStudentToGroup.bind(this);
    }

    addingStudentToGroup(studentId) {
        const id = this.props.groupId;
        Axios.post(`api/group/${id}/user/`, studentId)
            .then(response => console.log(studentId));
    }

    onRowClick(studentId, student) {
        if (studentId === this.state.selectedStudent.id) {
            this.setState({
                isStudentSelected: false,
                selectedStudent: {},
                selectedStudentId: -1
            });
        }
        else {
            this.setState({
                isStudentSelected: true,
                selectedStudent: student,
                selectedStudentId: studentId
            });
        }
    }

    render() {
        const studentList = this.props.existingStudents;
        return (<div>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Номер телефону</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map(student => (
                        <tr key={student.id}
                            onClick={() => { this.onRowClick(student.id, student) }}
                            className={student.id === this.state.selectedStudentId ? "selectedRow" : null}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.phoneNumber}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <br/>
            <button
            onClick={() => {this.addingStudentToGroup(this.state.selectedStudentId)}}
            type="button" 
            disabled={!this.state.isStudentSelected} 
            className="btn btn-success">Додати студента</button>
            <button onClick={()=>console.log(this.props.groupId)}> la la land</button>
        </div>);
    }
}

export default ExistingSudentsTable;