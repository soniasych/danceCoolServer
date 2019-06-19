import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Modal, Button, Container, Table, InputGroup, Form } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './AddNewLessonModal.css'

class AddNewLessonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonHour: null,
            lessonMinute: null,
            lessonDate: null,
            presentStudents: []
        }
        this.onDateChanged = this.onDateChanged.bind(this);
        this.onHourChanged = this.onHourChanged.bind(this);
        this.onMinuteChanged = this.onMinuteChanged.bind(this);
        this.onAddNewLesson = this.onAddNewLesson.bind(this);
        this.onStudentChecked = this.onStudentChecked.bind(this);
    }

    componentDidMount() {
        const today = new Date();
        this.setState({
            lessonHour: today.getHours(),
            lessonMinute: today.getMinutes(),
            lessonRoom: 'Малий зал',
            lessonDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        });
    }

    onDateChanged(day) {
        const today = new Date(day);
        let customDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.setState({
            lessonDate: customDate
        });
        console.log(customDate, this.state.lessonDate);
    }

    onHourChanged(event) {
        this.setState({ lessonHour: event.target.value });
    }

    onMinuteChanged(event) {
        this.setState({ lessonMinute: event.target.value });
    }

    onAddNewLesson(event) {
        this.AddNewLesson();
    }

    onStudentChecked(event) {
        if (!this.state.presentStudents.includes(parseInt(event.target.id, 10))) {
            let checkedStudents = [...this.state.presentStudents, parseInt(event.target.id, 10)];
            this.setState({
                presentStudents: checkedStudents
            });
        } else {
            let checkedStudents = this.state.presentStudents;
            let index = checkedStudents.indexOf(parseInt(event.target.id, 10));
            checkedStudents.splice(index, 1);
            this.setState({
                presentStudents: checkedStudents
            });
        }
    }

    render() {
        let today = new Date();
        let curHour = today.getHours();
        let curMinute = Math.ceil((today.getMinutes()) / 5) * 5;
        const students = this.props.students;
        return (
            <Modal show={this.props.isOpen} onHide={this.props.closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> Додати нове заняття</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="row justify-content-md-left">
                            <div className="col-md-3">
                                <label>Час заняття</label>
                            </div>
                            <div className="col-md-3">
                                <DayPickerInput
                                    onDayChange={this.onDateChanged}
                                    placeholder={new Date()} />
                            </div>
                            <div className="col-md-4">
                                <Form.Row>
                                    <Form.Group md="4">
                                        <InputGroup size="sm">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text >Час</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="number" min={0} max={23} width={30} placeholder={`${0}`}
                                                defaultValue={curHour} onChange={this.onHourChanged} />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text >:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="number" min={0} max={59} width={30} step={5}
                                                placeholder={`${0}`} defaultValue={curMinute} onChange={this.onMinuteChanged} />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>був?</th>
                                    <th>Студент</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>
                                            <Form.Check
                                                onChange={this.onStudentChecked}
                                                custom
                                                type='checkbox'
                                                id={student.id}
                                                label=''
                                            />
                                        </td>
                                        <td>{student.firstName} {student.lastName}</td>
                                    </tr>)
                                )}
                            </tbody>
                        </Table>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.onAddNewLesson}>
                        Зберегти
                    </Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Закрити
                    </Button>
                </Modal.Footer>
            </Modal>);
    }

    AddNewLesson() {
        let newLessonParameters = {
            lessonDate: this.state.lessonDate,
            lessonTime: `${this.state.lessonHour}:${this.state.lessonMinute}`,
            lessonRoom: this.state.lessonRoom,
            groupId: this.props.groupId
        };
        console.log(newLessonParameters);
        Axios.post('api/lessons/new-lesson', newLessonParameters, {
            headers: { Authorization: `Bearer ${this.props.access_token}` }
        })
            .then(response => {
                const presentStudents = {
                    checkedStudents: this.state.presentStudents
                }
                const lessonId = response.data;
                Axios.post(`api/attendance/${lessonId}/new-attendance/`, presentStudents, {
                    headers: { Authorization: `Bearer ${this.props.access_token}` }
                })
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
    }
}



const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(AddNewLessonModal);