import React, { Component } from 'react';
import {
    Modal, ModalHeader,
    ModalBody, ModalFooter
} from 'reactstrap';

export class EditGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedGroupState: {},
            isGroupChanged: false
        }
    }

    componentDidMount() {
        this.setState({
            changedGroupState: this.props.initialgroupState
        });
    }

    render() {
        return (
            <Modal
                isOpen={this.props.editGroupVisible}
                className="modal-dialog modal-lg" >
                <ModalHeader>
                    Редагувати групу
            </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <button
                        onClick={this.props.close}
                        className="btn btn-success"
                        disabled={!this.state.isGroupChanged}>
                        Зберегти зміни</button>
                    <button
                        onClick={this.props.closeEditModal}
                        className="btn btn-danger">
                        Закрити</button>
                </ModalFooter>
            </Modal>);
    }
}
