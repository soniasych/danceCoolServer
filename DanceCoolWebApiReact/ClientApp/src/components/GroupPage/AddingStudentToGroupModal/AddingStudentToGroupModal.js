import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { AddNewUserForm } from '../../common/AddNewUserForm';
import ReactTable from 'react-table';


export class AddingStudentToGroupModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStudent: {},
            isSelected: false
        }
        this.onSelectingStudent = this.onSelectingStudent.bind(this);
    }



    onSelectingStudent = (student)=> {
        this.setState({ selectedStudent: student });
        console.log(this.state.student);
    }

    render() {
        const data = this.props.studentsNotInGroup;
        return (<Modal
            isOpen={this.props.visible}
            className="modal-dialog modal-lg" >
            <ModalHeader>
                Додати студента до групи
            </ModalHeader>
            <ModalBody>
                <Tabs onSelect={this.props.selectStudentsNotInGroupTab}>
                    <Tab eventKey="AddNew" title="Додати нового">
                        <AddNewUserForm />
                    </Tab>
                    <Tab eventKey="AddExisting" title="Наявні студенти">
                        <ReactTable
                        className="-striped -highlight"
                        data={data}
                        columns={[
                            {
                                Header: 'Id',
                                id: "id",
                                accessor: d => d.id
                            },{
                                Header: 'FirstName',
                                accessor: 'firstName'
                            },{
                                Header: 'LastName',
                                accessor: 'lastName'
                            },{
                                Header: 'PhoneNumber',
                                accessor: 'phoneNumber'
                            }
                        ]}/>
                    </Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
                <button onClick={this.props.close} className="btn btn-primary">Close</button>
            </ModalFooter>
        </Modal>);
    }
}

export default AddingStudentToGroupModal;