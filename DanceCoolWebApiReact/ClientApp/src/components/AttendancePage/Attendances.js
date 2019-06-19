import React, { Component } from 'react';
import { Table, Form, InputGroup, Button } from 'react-bootstrap';
import Axios from 'axios';
import './Attendances.css';
import AddNewLessonModal from './NewLessonModal/AddNewLessonModal';
import { connect } from 'react-redux';

class AttendancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddNewLessoModalOpen: false,
            groupId: 0,
            month: 0,
            year: 0,
            monthes: [{ key: 1, name: "Січень" }
                , { key: 2, name: "Лютий" }
                , { key: 3, name: "Березень" }
                , { key: 4, name: "Квітень" }
                , { key: 5, name: "Травень" }
                , { key: 6, name: "Червень" }
                , { key: 7, name: "Липень" }
                , { key: 8, name: "Серпень" }
                , { key: 9, name: "Вересень" }
                , { key: 10, name: "Жовтень" }
                , { key: 11, name: "Листопад" }
                , { key: 12, name: "Грудень" }],
            years: [{ key: 2015, name: "2015" }
                , { key: 2016, name: "2016" }
                , { key: 2017, name: "2017" }
                , { key: 2018, name: "2018" }
                , { key: 2019, name: "2019" }],
            groups: [],
            lessons: [],
            students: [],
            studentAttendances: []
        };
        this.onSelectedMonth = this.onSelectedMonth.bind(this);
        this.onSelectedYear = this.onSelectedYear.bind(this);
        this.onSelectedGroup = this.onSelectedGroup.bind(this);
        this.showAddNewLessonModal = this.showAddNewLessonModal.bind(this);
        this.closeAddNewLessonModal = this.closeAddNewLessonModal.bind(AddNewLessonModal);
    }

    componentDidMount() {
        this.getGroups();
        this.setCurrentDate();
        this.getLessonsInMonth();
        this.getAttendancesInMonth();
    }

    onSelectedMonth(event) {
        let selectedIndex = event.target.options.selectedIndex;
        let newMonth = event.target.options[selectedIndex].getAttribute('month');
        this.setState({
            month: newMonth
        });
        this.getStudents(this.state.groupId);
        this.getLessonsInMonth(this.state.groupId, newMonth);
        this.getAttendancesInMonth(this.state.groupId, newMonth);
    }

    onSelectedYear(event) {
        let selectedIndex = event.target.options.selectedIndex;
        let newYear = event.target.options[selectedIndex].getAttribute('year');
        this.setState({
            year: newYear
        });
        this.getStudents();
        this.getLessonsInMonth();
        this.getAttendancesInMonth();
    }

    onSelectedGroup(event) {
        let selectedIndex = event.target.options.selectedIndex;
        let newGroup = event.target.options[selectedIndex].getAttribute('groupid');
        this.setState({
            groupId: newGroup
        });
        this.getStudents(newGroup);
        this.getLessonsInMonth(newGroup, this.state.month);
        this.getAttendancesInMonth(newGroup, this.state.month);
    }

    showAddNewLessonModal = (event)=> {
        this.setState({ isAddNewLessoModalOpen: true });
    }

    closeAddNewLessonModal = (event) =>{
        this.setState({ isAddNewLessoModalOpen: false });
    }

    render() {
        const today = new Date();
        const currMonth = this.state.monthes.find(month => month.key === (today.getMonth() + 1)).name;
        const currYear = this.state.years.find(year => year.key === (today.getFullYear())).name;
        return (
            <div className="container">
                <div className="Attendances-options-toolbar">
                    <div>
                        <Form.Group controlId="getGroupMentors">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text >Група</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" className="custom-select"
                                    onChange={this.onSelectedGroup}>
                                    <option selected>Оберіть групу</option>
                                    {this.state.groups.map(
                                        group =>
                                            <option
                                                key={group.groupId}
                                                groupid={group.groupId}>
                                                {group.groupDirection} {group.groupLevel}
                                            </option>
                                    )}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="getGroupMentors">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text >Період</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" className="custom-select"
                                    onChange={this.onSelectedMonth}>
                                    <option selected>{currMonth}</option>
                                    {this.state.monthes.map(month =>
                                        <option
                                            key={month.key}
                                            month={month.key}>
                                            {month.name}
                                        </option>)}
                                </Form.Control>
                                <Form.Control as="select" className="custom-select"
                                    onChange={this.onSelectedYear}>
                                    <option selected>{currYear}</option>
                                    {this.state.years.map(year =>
                                        <option
                                            key={year.key}
                                            year={year.key}>
                                            {year.name}
                                        </option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </div>
                    <div>
                        <Button onClick={this.showAddNewLessonModal} disabled={this.state.groupId < 1}>
                            Додати заняття
                        </Button>
                        <AddNewLessonModal
                        isOpen={this.state.isAddNewLessoModalOpen}
                        showModal={this.showAddNewLessonModal}
                        closeModal={this.closeAddNewLessonModal}
                        students={this.state.students}
                        />
                    </div>
                </div>
                <br />
                <div>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Студенти</th>
                                {this.state.lessons.map(lesson =>
                                    <th key={lesson.id}>{lesson.date}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.studentAttendances.map(studentAttendance =>
                                <tr key={studentAttendance.studentId}>
                                    <td>{studentAttendance.studentFirstName} {studentAttendance.studentLastName}</td>
                                    {
                                        studentAttendance.presences.map(presence =>
                                            <td key={presence.lessonId}>{presence.wasPresent ? "+" : ""}</td>)
                                    }
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

    setCurrentDate() {
        const today = new Date();
        this.setState({
            month: this.state.monthes.find(month => month.key === (today.getMonth() + 1)).key,
            year: this.state.years.find(year => year.key === (today.getFullYear())).key
        });
    }

    getLessonsInMonth(groupId, month) {
        let tempLessons = [];
        Axios.get(`api/lessons/${groupId}/${month}`)
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

    getAttendancesInMonth(groupId, month) {
        Axios.get(`api/attendance/${groupId}/${month}`)
            .then(response => {
                this.setState({ studentAttendances: response.data });
            })
            .catch(error => console.log(error))
    }

    getStudents(groupId) {
        Axios.get(`api/groups/${groupId}/users/`, {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({ students: response.data });
            })
            .catch(error => console.log(error));
    }

    getGroups() {
        Axios.get('api/groups/')
            .then(response =>
                this.setState({ groups: response.data })
            )
            .catch(error => console.log(error));
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(AttendancePage);