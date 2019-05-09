import React, { Component } from "react";
import Axios from 'axios';

export class ManagingUsersPage extends Component {
  static displayName = ManagingUsersPage.name;

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      loading: true
    };
  }

  componentDidMount() {
    this.populateAllStudents();
  }

  static renderUsersList(students) {
    return (
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Напрямок</th>
            <th>Рівень</th>
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
    return <div>
      <h1>Студенти школи La Lalsa</h1>

      {studentsTable}
    </div>;
  }

  async populateAllStudents() {
    const responce = await Axios.get('api/students');
    const data = await responce.data;
    this.setState({ students: data, loading: false });
  }

}
