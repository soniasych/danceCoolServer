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
            <form>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="inputEmail4">Ім'я</label>
                        <input
                            type="text"
                            class="form-control"
                            id="newstudentFirstName"
                            placeholder="Ім'я"
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputPassword4">Прізвище</label>
                        <input
                            type="text"
                            class="form-control"
                            id="newstudentFirstName"
                            placeholder="Прізвище"
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputPassword4">Номер Телефону</label>
                        <input
                            type="text"
                            class="form-control"
                            id="newstudentFirstName"
                            placeholder="Номер Телефону"
                        />
                    </div>
                </div>
                <button class="btn btn-primary">
                    Додати {Date.now().toLocaleString()}
                </button>
            </form>
        );
    }

    render() {
        let addingUserModal = AddingUserModal.renderAddingStudentForm();
        return (<div>{addingUserModal}</div>);
    }


}