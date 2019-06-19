import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Container, Table, Form, InputGroup } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class AddNewLessonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lalaland: 'lalaland'
        }
    }

    render() {
        let today = new Date();
        let time = today.getTime();
        const students = this.props.students;
        console.log(this.props.students);
        return (
            <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title> Додати нове заняття</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <label>Час заняття</label>
                            </div>
                            <div className="col-md-auto">
                                <DayPickerInput />
                            </div>
                            <div className="col-md-auto">
                            <Form.Control as="time"
                            step="1"
                            value={time}>

                            </Form.Control>
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>Студент</tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
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