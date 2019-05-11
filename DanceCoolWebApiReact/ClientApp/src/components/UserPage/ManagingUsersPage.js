import React, { Component } from "react";
import Axios from 'axios';
const { API_KEY } = process.env;

export class ManagingUsersPage extends Component {
  static displayName = ManagingUsersPage.name;

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchQuery: '',
      loading: true
    };
  }

  componentDidMount() {
    this.populateAllStudents();
  }

  handleSearchChange = (event) => {
    this.setState({
      searchQuery: this.search.value
    }, () => {
      if (this.state.searchQuery && this.state.searchQuery.length > 2) {
        if (this.state.searchQuery.length % 2 === 0) {
          this.searchUsers()
        }
      }
    })
  }

  static renderUsersList(students) {
    return (
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Нормер телефону</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student =>
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.phoneNumber}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let studentsTable = ManagingUsersPage.renderUsersList(this.state.students)
    return (<div>
      <h1>Студенти школи La Lalsa</h1>
      <form>
        <label>Пошук Студента</label>
        <input type="text"
          ref={input => this.search = input}
          className="search-box"
          id="studentSearchInput"
          aria-describedby="emailHelp"
          onChange={this.handleSearchChange.bind(this)} />
      </form>
      {studentsTable}
    </div>);
  }




  async populateAllStudents() {
    const responce = await Axios.get('api/users');
    const data = await responce.data;
    this.setState({ students: data, loading: false });
  }

  async searchUsers() {
    const responce = await Axios.get(`api/users/search?searchQuery=${this.state.searchQuery}`);
    const data = await responce.data;
    this.setState({ students: data, loading: false });
  }
}
