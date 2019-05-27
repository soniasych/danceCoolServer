import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { AddNewUserForm } from '../../common/AddNewUserForm';
import ExistingSudentsTable from './ExistingSudentsTable';
import Axios from 'axios';


const AddingStudentToGroupModal = (props) => {

    const addingStudentToGroup = (studentId) => {
        const groupId = this.props.match.params.id;
        Axios.post(`api/group/${groupId}/user`, studentId)
            .then(response => console.log(studentId));
    }


    return (<Modal
        isOpen={props.visible}
        className="modal-dialog modal-lg" >
        <ModalHeader>
            Додати студента до групи
            </ModalHeader>
        <ModalBody>
            <Tabs onSelect={props.selectStudentsNotInGroupTab}>
                <Tab eventKey="NewStudentForm" title="Додати нового">
                    <AddNewUserForm />
                </Tab>
                <Tab eventKey="ExistingStudents" title="Наявні студенти">
                    <ExistingSudentsTable existingStudents={props.studentsNotInGroup}
                        addingStudentToGroup={addingStudentToGroup}
                    />
                </Tab>
            </Tabs>
        </ModalBody>
        <ModalFooter>
            <button onClick={props.close} className="btn btn-primary">Close</button>
        </ModalFooter>
    </Modal>);
}

export default AddingStudentToGroupModal;