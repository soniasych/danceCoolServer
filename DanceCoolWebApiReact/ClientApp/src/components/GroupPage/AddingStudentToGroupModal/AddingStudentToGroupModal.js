import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {
    Tabs,
    Tab
} from 'react-bootstrap'

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
                    <div>Adding new</div>
                </Tab>
                <Tab eventKey="AddExisting" title="Add existing student">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Ім'я</th>
                                <th>Прізвище</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.allStudents.map(student => (
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