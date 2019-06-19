import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import AddNewPaymentForm from "./AddNewPaymentForm";

const AddPaymentModal = props => {
  let groupId = props.groupId;
  return (
    <Modal isOpen={props.visible} className="modal-dialog modal-lg">
      <ModalHeader>Новий платіж</ModalHeader>
      <ModalBody>
        <AddNewPaymentForm />
      </ModalBody>
      <ModalFooter>
        {/* <button onClick={props.addNewPayment} className="btn btn-primary" type="button">
          Оплатити
        </button> */}
        <button onClick={props.close} className="btn btn-primary">
          Закрити
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPaymentModal;
