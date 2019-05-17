import React, { Component } from 'react';
import Axios from 'axios';

export class AddingUserModal extends Component {
    static displayName = AddingUserModal.name;

    constructor(props) {
        super(props);

        this.state = {
            studentFirstName: 'rgosing',
            studentLastName: 'lalaland',
            studentPhoneNumber: ''
        };

        this.onFirtsNameInputChanged = this.onFirtsNameInputChanged.bind(this);
        this.onLastNameInputChanged = this.onLastNameInputChanged.bind(this);
        this.onPhonNumberInputChanged = this.onPhonNumberInputChanged.bind(this);
    }

    onFirtsNameInputChanged = event => {
        this.setState({ studentFirstName: event.target.value});
    }

    onLastNameInputChanged = event => {
        this.setState({ studentLastName: event.target.value});        
    }

    onPhonNumberInputChanged = event => {        
        this.setState({ studentPhoneNumber: event.target.value});        
    }

    renderAddingStudentForm() {
        return (
            <div>
                <label>Додавання нового студента</label>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <input
                                type="text"
                                value={this.state.studentFirstName}
                                onChange={this.onFirtsNameInputChanged}
                                className="form-control"
                                placeholder="Ім'я"/>
                        </div>
                        <div class="form-group col-md-4">
                            <input
                                type="text"                                
                                value={this.state.studentFirstName}
                                onChange={this.onLastNameInputChanged}
                                class="form-control"
                                id="newstudentFirstName"
                                placeholder="Прізвище"/>
                        </div>
                        <div class="form-group col-md-4">
                            <input
                                type="text"                                
                                value={this.state.studentPhoneNumber}
                                onChange={this.onPhonNumberInputChanged}
                                class="form-control"
                                id="newstudentFirstName"
                                placeholder="Номер Телефону"/>
                        </div>
                    </div>
                    <button class="btn btn-primary">
                        Додати
                </button>
                </form>
            </div>
        );
    }

    render() {
        let addingUserModal = this.renderAddingStudentForm();
        return (<div>{addingUserModal}</div>);
    }

    async addStudent() {
        const addedStudent = {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            phoneNumber: this.state.studentPhoneNumber
        };
        const response = await Axios.post('api/users/', addedStudent);
    }

}