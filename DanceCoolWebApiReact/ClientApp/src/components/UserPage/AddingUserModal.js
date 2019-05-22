import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
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
                    <form className="needs-validation" noValidate>
                        <div className="form-row">
                            <div className="col-md-4 mb-3">
                                <label for="validationDefault01">Ім'я</label>
                                <input type="text" className="form-control" id="validationDefault01" required value={this.state.studentFirstName} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label for="validationDefault02">Прізвище</label>
                                <input type="text" className="form-control" id="validationDefault02" required value={this.state.studentLastName}/>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label for="validationDefaultUsername">Номер телефону</label>
                                <input type="text" className="form-control" id="validationDefaultUsername" required value={this.state.studentPhoneNumber} />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit" onSubmit={this.onAddStudentButtonClickHandler}>Додати студента</button>
                        <button className="btn btn-secondary" type="button" onClick={this.props.closeModal}>Закрити</button>
                    </form>                    
                </ModalBody>                
            </Modal>
        );
    }

    render() {
        let addingUserModal = this.renderAddingStudentForm();
        return (<div>{addingUserModal}</div>);
    }
}