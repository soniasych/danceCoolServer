import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { AddNewUserToGroupForm } from './AddNewUserToGroupForm';
import ExistingSudentsTable from './ExistingSudentsTable';

const AddingStudentToGroupModal = props => {
    let groupId = props.groupId;
    return (
        <Modal
            isOpen={props.visible}
            className="modal-dialog modal-lg" >
            <ModalHeader>
                Додати студента до групи
            </ModalHeader>
            <ModalBody>
                <Tabs onSelect={props.selectStudentsNotInGroupTab}>
                    <Tab eventKey="NewStudentForm" title="Додати нового">
                        <AddNewUserToGroupForm groupId={props.groupId}/>
                    </Tab>
                    <Tab eventKey="ExistingStudents" title="Наявні студенти">
                        <ExistingSudentsTable existingStudents={props.studentsNotInGroup}
                            groupId={props.groupId}
                        />
                    </Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
                <button onClick={props.close} className="btn btn-primary">Закрити</button>
            </ModalFooter>
        </Modal>);
}

export default AddingStudentToGroupModal;
