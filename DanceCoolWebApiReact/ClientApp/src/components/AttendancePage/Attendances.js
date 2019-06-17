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
            attendances: [],
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
                                    <tr key={studentAttendance.currentStudent.id}>
                                        <td>{studentAttendance.currentStudent.firstName} {studentAttendance.currentStudent.lastName}</td>
                                        {
                                            studentAttendance.presences.map(presence=>
                                            <td key={presence.lessonId}>{presence.lessonPresence ? "+": ""}</td>)
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
        let studentAttendances = [];
        Axios.get("api/attendance/1/4/")
            .then(response => 
                this.setState({attendances: response.data
                }))
            .then(() => {
                for (let index = 1; index < this.state.students.length - 1; index++) {
                    let currentStudent = this.state.students[index];
                    let allLessonsId = this.state.lessons.map(lesson => lesson.id);

                    let curentStudentAttendances = this.state.attendances
                        .filter(attendance => attendance.presentStudentId === currentStudent.id)
                        .map(attendance => attendance.lessonId);

                    let presences = [];

                    for (let index = 0; index < allLessonsId.length; index++) {
                        if (curentStudentAttendances.includes(allLessonsId[index])) {
                            presences.push({
                                lessonId: allLessonsId[index],
                                lessonPresence: true
                            });
                        } else {
                            presences.push({
                                lessonId: allLessonsId[index],
                                lessonPresence: false
                            });
                        }
                    }
                    let frontObject = {
                        currentStudent,
                        presences
                    }
                    studentAttendances.push(frontObject);
                }
                this.setState({studentAttendances: studentAttendances});
                console.log(this.state.studentAttendances);
            })
            .catch();
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