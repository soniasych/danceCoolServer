import React, { Component } from 'react';
import Axios from 'axios';

export class AddNewUserToGroupForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentId: null,
            studentFirstName: '',
            studentLastName: '',
            studentPhoneNumber: '',
            isAddingActive: false

        };

        this.onFirtsNameInputChanged = this.onFirtsNameInputChanged.bind(this);
        this.onLastNameInputChanged = this.onLastNameInputChanged.bind(this);
        this.onPhoneNumberInputChanged = this.onPhoneNumberInputChanged.bind(this);
        this.onAddStudentButtonClickHandler = this.onAddStudentButtonClickHandler.bind(this);
    }

    onFirtsNameInputChanged = event => {
        this.setState({ studentFirstName: event.target.value });
        console.log(this.state.studentFirstName);
    }

    onLastNameInputChanged = event => {
        this.setState({ studentLastName: event.target.value });
        console.log(this.state.studentLastName);
    }

    onPhoneNumberInputChanged = event => {
        this.setState({ studentPhoneNumber: event.target.value });
        console.log(this.state.studentPhoneNumber);
    }

    onAddStudentButtonClickHandler = event => {
        Axios.post('api/users/', {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            phoneNumber: this.state.studentPhoneNumber
        })
            .then(response => {

                Axios.get(`api/users/phone?phoneNumber=${this.state.studentPhoneNumber}`)
                    .then(response => {
                        
                        this.setState({ studentId: response.data.id });
                        Axios.post(`api/group/${this.props.groupId}/user/`, {
                            userId: this.state.studentId,
                            groupId: this.props.groupId
                        });
                    });
            });
    }

    render() {
        return (<form className="needs-validation" noValidate>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label>Ім'я</label>
                    <input type="text"
                        className="form-control"
                        onChange={this.onFirtsNameInputChanged} />
                </div>
                <div className="col-md-4 mb-3">
                    <labe>Прізвище</labe>
                    <input type="text"
                        className="form-control"
                        onChange={this.onLastNameInputChanged} />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefaultUsername">Номер телефону</label>
                    <input type="text"
                        className="form-control"
                        id="validationDefaultUsername"
                        onChange={this.onPhoneNumberInputChanged} />
                </div>
            </div>
            <button className="btn btn-primary" type="button"
                onClick={this.onAddStudentButtonClickHandler}>
                Додати студента
                </button>
        </form>);
    }
}