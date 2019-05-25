import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap'
import { AddNewUserForm } from '../../common/AddNewUserForm'


export class AddingStudentToGroupModal extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (<Modal
            isOpen={this.props.visible}
            className="modal-dialog modal-lg" >
            <ModalHeader>
                <h5 >Додати студента до групи</h5>
            </ModalHeader>
            <ModalBody>
                <Tabs onSelect={this.props.selectStudentsNotInGroupTab}>
                    <Tab eventKey="AddNew" title="Додати нового">
                        <AddNewUserForm />
                    </Tab>
                    <Tab eventKey="AddExisting" title="Наявні студенти">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Ім'я</th>
                                    <th>Прізвище</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.studentsNotInGroup.map(student => (
                                    <tr key={student.id} onClick={() => console.log(student)}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
                <button onClick={this.props.close} className="btn btn-primary">Close</button>
            </ModalFooter>
        </Modal>);
    }
}

export default AddingStudentToGroupModal;