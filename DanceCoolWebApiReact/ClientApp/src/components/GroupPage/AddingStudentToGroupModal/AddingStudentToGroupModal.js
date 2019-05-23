import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap'
import {AddNewUserForm} from '../../common/AddNewUserForm'


const AddingStudentToGroupModal = (props) => {
    return (<Modal
        isOpen={props.visible}
        className="modal-dialog modal-lg">
        <ModalHeader>
            <h5 >Додати студента до групи</h5>
        </ModalHeader>
        <ModalBody>
            <Tabs>
                <Tab eventKey="AddNew" title="Add new student">
                    <AddNewUserForm/>
                </Tab>
                <Tab onClick={props.selectStudentsNotInGroupTab} eventKey="AddExisting" title="Add existing student">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Ім'я</th>
                                <th>Прізвище</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.studentsNotInGroup.map(student => (
                                <tr key={student.id}>
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
            <button onClick={props.close} className="btn btn-primary">Close</button>
        </ModalFooter>
    </Modal>);
}

export default AddingStudentToGroupModal;