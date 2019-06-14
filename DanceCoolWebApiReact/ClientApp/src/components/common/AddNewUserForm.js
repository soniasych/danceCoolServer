import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

class AddNewUserForm extends Component {

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
        console.log(this.state.studentLastName);
    }

    onLastNameInputChanged = event => {
        this.setState({ studentLastName: event.target.value });
        console.log(this.state.studentLastName);

    }

    onPhonNumberInputChanged = event => {
        this.setState({ studentPhoneNumber: event.target.value });
        console.log(this.state.studentLastName);
    }

    onAddStudentButtonClickHandler = event => {
        if (this.state.studentFirstName >= 1 &&
            this.state.studentLastName >= 1 &&
            this.state.studentPhoneNumber >= 1) {
            this.addStudent();
        }
        let addedStudent = {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            phoneNumber: this.state.studentPhoneNumber
        };
        Axios.post('api/users/', addedStudent, {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));

    }

    render() {
        return (<form className="needs-validation" noValidate>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault01">Ім'я</label>
                    <input type="text"
                        className="form-control"
                        id="validationDefault01"
                        required value={this.state.studentFirstName}
                        onChange={this.onFirtsNameInputChanged} />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault02">Прізвище</label>
                    <input type="text"
                        className="form-control"
                        id="validationDefault02"
                        required value={this.state.studentLastName}
                        onChange={this.onLastNameInputChanged} />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefaultUsername">Номер телефону</label>
                    <input type="text"
                        className="form-control"
                        id="validationDefaultUsername"
                        required value={this.state.studentPhoneNumber}
                        onChange={this.onPhonNumberInputChanged} />
                </div>
            </div>
            <button className="btn btn-primary" type="button" onClick={this.onAddStudentButtonClickHandler}>Додати студента</button>
        </form>);
    }
}



const mapStateToProps = state => {
    return {
      access_token: state.logInReducer.access_token,
      roleName: state.logInReducer.roleName
    };
  };
  
  export default connect(mapStateToProps)(AddNewUserForm);
