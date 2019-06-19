import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            lessonDate: null
        }
    }

    render() {
        let today = new Date();
        let curHour = today.getHours();
        let curMinute = Math.ceil((today.getMinutes()) / 5) * 5;
        const students = this.props.students;
        console.log(this.props.students);
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
                                <DayPickerInput />
                            </div>
                            <div className="col-md-4">
                                <Form.Row>
                                    <Form.Group md="4">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text >Час</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="number" min={0} max={23} width={30} placeholder={`${0}`} defaultValue={curHour} />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text >:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="number" min={0} max={59} width={30} step={5} placeholder={`${0}`} defaultValue={curMinute} />
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
                    <Button variant="success" onClick={this.props.closeModal}>
                        Зберегти
                    </Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Закрити
                    </Button>
                </Modal.Footer>
            </Modal>);
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(AddNewLessonModal);