import React, { Component } from 'react';

export class AddingUserModal extends Component {
    static displayName = AddingUserModal.name;

    constructor(props) {
        super(props);
        this.state = {
            studentFirstName: '',
            studentLastName: '',
            studentPhoneNumber: ''
        };
    }

}