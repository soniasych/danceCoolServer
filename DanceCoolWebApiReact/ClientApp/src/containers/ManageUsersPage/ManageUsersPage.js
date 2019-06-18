import React, { Component } from "react";
import { Form, InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from "axios";
import AddingUserModal from '../../components/ManageUsersPage/AddingNewUserModal';
import './ManageUserPage.css';

class ManageUsersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsSelected: false,
      selectedUserId: 0,
      selectedUser: {},
      roles: [],
      users: [],
      searchQuery: "",
      addingStudentModalVisible: false
    };
    this.AddingStudenModalHandler = this.AddingStudenModalHandler.bind(AddingUserModal);
    this.onChangeRoleButtonClick = this.onChangeRoleButtonClick.bind(this);
  }

  componentDidMount() {
    this.populateAllUsers();
    this.getAllRoles();
  }

  TranslateRoleName(engRoleName) {
    switch (engRoleName) {
      case "Admin":
        return "Адміністратор";
      case "Mentor":
        return "Інструктор";
      default:
        return "Студент";
    }
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

  onRowClick(userId, user) {
    if (userId === this.state.selectedUser.id) {
      this.setState({
        userIsSelected: false,
        selectedUser: {},
        selectedUserId: -1
      });
    }
    else {
      this.setState({
        userIsSelected: true,
        selectedUser: user,
        selectedUserId: userId
      });
    }
  }

  AddingStudenModalHandler = event => {
    if (this.state.addingStudentModalVisible === false) {
      this.setState({ addingStudentModalVisible: true });
    }
    else {
      this.setState({ addingStudentModalVisible: false });
    }
  }

  onChangeRoleButtonClick(event) {
    this.ChangeUserRole();
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
        <div className="Manage-options-toolbar">
          <div>
            <Form.Group controlId="getGroupMentors">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text >Роль</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" className="custom-select"
                  disabled={!this.state.userIsSelected}
                  onChange={this.onSelectedPrimaryMentor}>
                  <option selected>
                    Оберіть особу
                  </option>
                  {this.state.roles.map(role =>
                    <option key={role.roleId}
                      roleId={role.roleId}>
                      {`${role.roleName}`}
                    </option>)}
                </Form.Control>
              </InputGroup>
            </Form.Group>
          </div>
          <div>
            <Button onClick={this.onChangeRoleButtonClick}>
              Змінити роль
            </Button>
          </div>
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Нормер телефону</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}
                onClick={() => { this.onRowClick(user.id, user) }}
                className={user.id === this.state.selectedUserId ? "selectedRow" : null}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>{this.TranslateRoleName(user.roleName)}</td>
              </tr>
            ))}
          </tbody>
        </table> />
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
        this.setState({ users: response.data }))
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

  async getAllRoles() {
    Axios.get('/api/roles', {
      headers: {
        Authorization: `Bearer ${this.props.access_token}`
      }
    })
      .then(response => this.setState({
        roles: response.data
      }))
      .catch();
  }

  async ChangeUserRole() {
    Axios.put('/api/user/changeuserrole', {
      userId: 3,
      newRoleId: 3
    }, {
        headers: {
          Authorization: `Bearer ${this.props.access_token}`
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.logInReducer.access_token,
    roleName: state.logInReducer.roleName
  };
};

export default connect(mapStateToProps)(ManageUsersPage);