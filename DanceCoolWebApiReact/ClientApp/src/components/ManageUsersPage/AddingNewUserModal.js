import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import AddNewUserForm from '../common/AddNewUserForm'

const AddingUserModal = (props) => {
    return (<Modal
        isOpen={props.addingStudentModalVisible}>
        <ModalHeader>Додавання нового студента</ModalHeader>
        <ModalBody>
            <AddNewUserForm />
            <br />
            <button className="btn btn-danger" onClick={props.closeModal}>Закрити</button>
        </ModalBody>

    </Modal>);
}

export default AddingUserModal;