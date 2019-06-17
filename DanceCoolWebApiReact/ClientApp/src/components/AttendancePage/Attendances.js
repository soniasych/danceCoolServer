import React, { Component } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Attendances.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';

class AttendancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            lessons: [],
            students: [],
            studentAttendances:[]
        };
    }

    componentDidMount() {
        this.GetLessonsInMonth();
        this.getStudents();
        this.getGroups();
        this.getAttendances();
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
                                {this.state.studentAttendances.map(studentAttendance =>
                                    <tr key={studentAttendance.studentId}>
                                        <td>{studentAttendance.studentFirstName} {studentAttendance.studentLastName}</td>
                                        {
                                            studentAttendance.presences.map(presence=>
                                            <td key={presence.lessonId}>{presence.wasPresent ? "+": ""}</td>)
                                        }
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
        let tempLessons = [];
        Axios.get('api/lessons/1/4')
            .then(response => {
                tempLessons = response.data;
                for (let index = 0; index < tempLessons.length; index++) {
                    const date = new Date(tempLessons[index].date);
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    tempLessons[index].date = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
                }

                this.setState({ lessons: tempLessons });
            })
            .catch(error => console.log(error));
    }

    getAttendances() {
        Axios.get("api/attendance/1/4/")
        .then(response => {
            this.setState({ studentAttendances: response.data });
            console.log(this.state.studentAttendances)
        })
        .catch(error => console.log(error))
            
    }

    getStudents() {
        Axios.get('api/groups/1/users/', {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        })
            .then(response => {
                this.setState({ students: response.data });
            })
            .catch(error => console.log(error));
    }

    getGroups() {
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