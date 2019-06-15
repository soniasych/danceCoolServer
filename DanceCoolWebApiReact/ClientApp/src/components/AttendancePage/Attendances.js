import React, { Component } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Attendances.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {connect} from 'react-redux';

class AttendancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            attendances: [],
            lessons: [],
            students: []
        };
    }

    componentDidMount() {
        this.getAttendancesByMonth();
        this.GetLessonsInMonth();
        this.getStudents();
        this.getGroups();
    }

    render() {
        return (
            <div className="container">
                <div className="Attendances-options-toolbar">
                    <div>
                        <Button variant="primary">
                            Додати студента до групи
                    </Button>
                    </div>
                    <div>
                        <DropdownButton id="dropdown-basic-button" title="Оберіть групу">
                            {this.state.groups.map(
                                group =>
                                    <Dropdown.Item key={group.groupId}>
                                        {group.groupDirection} {group.groupLevel}
                                    </Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                    <div>
                        <Button variant="primary">
                            Додати нове заняття
                    </Button>
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Students</th>
                                    {this.state.lessons.map(lesson =>
                                        <th key={lesson.id}>{lesson.date}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.students.map(student => 
                                    <tr key={student.id}>
                                        <td>{student.firstName} {student.lastName}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

    GetLessonsInMonth() {
        let tempLessons=[];
        Axios.get('api/lessons/1/4')
            .then(response => {
                tempLessons = response.data;
                for (let index = 0; index < tempLessons.length; index++) {
                    const date = new Date(tempLessons[index].date);
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    tempLessons[index].date = `${day < 10 ? '0'+ day : day }.${month  < 10 ? '0'+ month : month }`;
                }
                
                this.setState({lessons:tempLessons});
            })
            .catch(error => console.log(error));
    }

    getAttendancesByMonth = () => {
        Axios.get('https://my.api.mockaroo.com/attendances.json?key=63b23930')
            .then(response => {
                this.setState({ attendances: response.data })
            }
            );
    }

    getStudents(){
        Axios.get('api/groups/1/users/',{
            headers: {
              Authorization: `Bearer ${this.props.access_token}`
            }
          })
            .then(response =>{
                this.setState({ students: response.data });
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }

    getGroups = () => {
        Axios.get('api/groups/')
            .then(response =>
                this.setState({ groups: response.data })
            );
    }
}

const mapStateToProps = state => {
    return {
      access_token: state.logInReducer.access_token,
      roleName: state.logInReducer.roleName
    };
  };
  
  export default connect(mapStateToProps)(AttendancePage);