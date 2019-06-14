import React, { Component } from "react";
import { connect } from 'react-redux';
import Axios from "axios";
import UsersList from '../components/ManageUsersPage/UsersList';
import AddingUserModal from '../components/ManageUsersPage/AddingNewUserModal';

class ManageUsersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchQuery: "",
      loading: true,
      addingStudentModalVisible: false
    };
    this.AddingStudenModalHandler = this.AddingStudenModalHandler.bind(AddingUserModal);
  }

  componentDidMount() {
    this.populateAllUsers();
  }

  handleSearchChange = event => {
    this.setState(
      {
        searchQuery: this.search.value
      },
      () => {
        if (this.state.searchQuery && this.state.searchQuery.length >= 1) {
          this.searchUsers();
        } else {
          this.populateAllUsers();
        }
      }
    );
  };

  AddingStudenModalHandler = event => {
    if (this.state.addingStudentModalVisible === false) {
      this.setState({ addingStudentModalVisible: true });
    }
    else {
      this.setState({ addingStudentModalVisible: false });
    }

  }

  render() {
    let visingStatus = this.state.addingStudentModalVisible;
    return (
      <div>
        <h1>Студенти школи La Lalsa</h1>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Пошук студента
            </span>
          </div>
          <input
            type="text"
            ref={input => (this.search = input)}
            id="studentSearchInput"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={this.handleSearchChange.bind(this)}
          />
          <span>
            <button
              className="btn btn-primary"
              onClick={this.AddingStudenModalHandler}>
              Додати нового студента</button>
          </span>
        </div>
        <AddingUserModal addingStudentModalVisible={visingStatus}
          closeModal={this.AddingStudenModalHandler}
        />
        <br />
        <UsersList students={this.state.students} />
      </div>
    );
  }


  async populateAllUsers() {
    Axios.get("api/users", {
      headers: {
        Authorization: `Bearer ${this.props.access_token}`
      }
    })
      .then(response =>
        this.setState({ students: response.data }))
      .catch(error => console.log(error));
  }

  async searchUsers() {
    Axios.get(
      `api/users/search?searchQuery=${this.state.searchQuery}`, {
        headers: {
          Authorization: `Bearer ${this.props.access_token}`
        }
      }).then(response =>
        this.setState({ students: response.data }))
      .catch(error => console.log(error));
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.logInReducer.access_token,
    roleName: state.logInReducer.roleName
  };
};

export default connect(mapStateToProps)(ManageUsersPage);