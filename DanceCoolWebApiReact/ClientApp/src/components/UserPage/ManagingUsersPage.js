import React, { Component } from "react";
import Axios from "axios";
import { AddingUserModal } from './AddingUserModal/AddingUserModal';

export class ManagingUsersPage extends Component {

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
        } else {
          this.populateAllStudents();
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

  AddingStudenModalHandler = event => {
    if(this.state.addingStudentModalVisible===false){
      this.setState({ addingStudentModalVisible: true });
    }
    else{
      this.setState({ addingStudentModalVisible: false });
    }
     
  }  

  render() {
    let studentsTable = ManagingUsersPage.renderUsersList(this.state.students);
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
          <AddingUserModal addingStudentModalVisible={this.state.addingStudentModalVisible}
          closeModal={this.AddingStudenModalHandler}
          />
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
