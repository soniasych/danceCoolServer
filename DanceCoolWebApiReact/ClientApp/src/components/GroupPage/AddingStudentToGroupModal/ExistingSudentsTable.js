import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import './AddingStudentToGroupModal.css';

export class ExistingSudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStudentSelected: false,
            selectedStudent: {},
            selectedStudentId: -1
        };
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
        return (<table className="table table-sm">
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
        </table>);
    }
}

export default ExistingSudentsTable;