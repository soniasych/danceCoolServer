import React, { Component } from 'react';
import Axios from 'axios';

export class AddingUserModal extends Component {
    static displayName = AddingUserModal.name;

    constructor(props) {
        super(props);
        this.state = {
            studentFirstName: '',
            studentLastName: '',
            studentPhoneNumber: ''
        };

    }

    static renderAddingStudentForm() {
        return (
            <div>
                <label>Додавання нового студента</label>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <input
                                type="text"
                                class="form-control"
                                id="newstudentFirstName"
                                placeholder="Ім'я"
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <input
                                type="text"
                                class="form-control"
                                id="newstudentFirstName"
                                placeholder="Прізвище"
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <input
                                type="text"
                                class="form-control"
                                id="newstudentFirstName"
                                placeholder="Номер Телефону"
                            />
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
        let addingUserModal = AddingUserModal.renderAddingStudentForm();
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