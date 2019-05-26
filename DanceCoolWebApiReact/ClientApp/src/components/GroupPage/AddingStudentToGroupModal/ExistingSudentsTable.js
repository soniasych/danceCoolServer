import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export class ExistingSudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStudentSelected: false,
            selectedStudent: {}
        };
    }

    render() {
        const studentList = this.props.existingStudents;
        return (<Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Ім'я</th>
                    <th>Прізвище</th>
                    <th>Номер телефону</th>
                </tr>
            </thead>
            <tbody>
                {studentList.map(student => (
                    <tr key={student.id} onClick={ () => {
                        if (student.id === this.state.selectedStudent.id) {
                            this.setState({isStudentSelected: false, selectedStudent: {} })
                        }
                        else{
                            this.setState({isStudentSelected: true, selectedStudent: student})
                        }
                    }}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.phoneNumber}</td>
                    </tr>
                ))}
            </tbody>

        </Table>);
    }
}

export default ExistingSudentsTable;