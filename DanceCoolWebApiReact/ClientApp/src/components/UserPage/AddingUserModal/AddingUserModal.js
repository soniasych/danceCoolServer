import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import Axios from 'axios';


export class AddingUserModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentFirstName: '',
            studentLastName: '',
            studentPhoneNumber: ''
        };

        this.onFirtsNameInputChanged = this.onFirtsNameInputChanged.bind(this);
        this.onLastNameInputChanged = this.onLastNameInputChanged.bind(this);
        this.onPhonNumberInputChanged = this.onPhonNumberInputChanged.bind(this);
        this.onAddStudentButtonClickHandler = this.onAddStudentButtonClickHandler.bind(this);
        this.closeAddingStudenModalHandler = this.closeAddingStudenModalHandler.bind(this);
    }

    onFirtsNameInputChanged = event => {
        this.setState({ studentFirstName: event.target.value });
    }

    onLastNameInputChanged = event => {
        this.setState({ studentLastName: event.target.value });
    }

    onPhonNumberInputChanged = event => {
        this.setState({ studentPhoneNumber: event.target.value });
    }

    closeAddingStudenModalHandler = event => {
        this.setState({
            addingStudentModalVisible: false
        });
      }

    onAddStudentButtonClickHandler = event => {
        if (this.state.studentFirstName >= 1 &&
            this.state.studentLastName >= 1 &&
            this.state.studentPhoneNumber >= 1) {
                this.addStudent();
        }
        const addedStudent = {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            phoneNumber: this.state.studentPhoneNumber
        };

        Axios.post('api/users/', addedStudent)
        .then(response => console.log(response));
        
        event.preventDefault();
    }

    renderAddingStudentForm() {
        return (
            <Modal
            isOpen={this.props.addingStudentModalVisible}>
                <ModalHeader>Додавання нового студента</ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <input
                                type="text"
                                value={this.state.studentFirstName}
                                onChange={this.onFirtsNameInputChanged}
                                className="form-control"/>
                        </div>
                        <div className="form-group col-md-4">
                            <input
                                type="text"
                                value={this.state.studentLastName}
                                onChange={this.onLastNameInputChanged}
                                className="form-control"
                                id="newstudentFirstName"/>
                        </div>
                        <div className="form-group col-md-4">
                            <input
                                type="text"
                                value={this.state.studentPhoneNumber}
                                onChange={this.onPhonNumberInputChanged}
                                className="form-control"
                                id="newstudentFirstName" />
                        </div>
                    </div>                    
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary"
                        onClick={this.onAddStudentButtonClickHandler}>
                        Додати</button>
                        <button
                        className="btn btn-secondary"
                        onClick={this.props.closeModal}>
                        Відмінити
                        </button>
                </ModalFooter>
            </Modal>
        );
    }

    render() {
        let addingUserModal = this.renderAddingStudentForm();
        return (<div>{addingUserModal}</div>);
    }    
}