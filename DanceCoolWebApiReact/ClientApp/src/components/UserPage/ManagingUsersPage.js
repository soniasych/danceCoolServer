import React, { Component } from "react";
import Axios from "axios";
import { AddingUserModal } from './AddingUserModal/AddingUserModal';
const { API_KEY } = process.env;

export class ManagingUsersPage extends Component {
  static displayName = ManagingUsersPage.name;

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchQuery: "",
      loading: true
    };
  }

  componentDidMount() {
    this.populateAllStudents();
  }

  handleSearchChange = event => {
    this.setState(
      {
        searchQuery: this.search.value
      },
      () => {
        if (this.state.searchQuery && this.state.searchQuery.length > 2) {
          this.searchUsers();
        }
      }
    );
  };

  static renderUsersList(students) {
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Нормер телефону</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let studentsTable = ManagingUsersPage.renderUsersList(this.state.students);
    return (
      <div>
        <h1>Студенти школи La Lalsa</h1>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
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
        </div>
        <br />
        <AddingUserModal />
        <br />
        {studentsTable}
      </div>
    );
  }

  async populateAllStudents() {
    const responce = await Axios.get("api/users");
    const data = await responce.data;
    this.setState({ students: data, loading: false });
  }

  async searchUsers() {
    const responce = await Axios.get(
      `api/users/search?searchQuery=${this.state.searchQuery}`
    );
    const data = await responce.data;
    this.setState({ students: data, loading: false });
  }
}
