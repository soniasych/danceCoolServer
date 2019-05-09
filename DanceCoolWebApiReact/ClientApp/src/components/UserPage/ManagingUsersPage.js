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


  render() {
    return <div>Here will bee all users</div>;
  }

  async populateAllStudents() {
    const responce = await Axios.get('api/students');
    const data = await responce.data;
    this.setState({ students: data, loading: false });
  }

}
