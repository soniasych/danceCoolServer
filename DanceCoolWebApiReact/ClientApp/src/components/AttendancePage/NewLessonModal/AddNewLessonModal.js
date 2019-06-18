import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

class AddNewLessonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lalaland: 'lalaland'
        }
    }

    render() {
        return (
            <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title> Додати нове заняття</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="success" onClick={this.handleClose}>
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