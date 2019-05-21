import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

const AddingStudentToGroupModal = (props) => {
    return (<Modal
        isOpen={props.visible}>
        <ModalHeader></ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
            <button onClick={props.close}>Close</button>
        </ModalFooter>
    </Modal>);
}

export default AddingStudentToGroupModal;