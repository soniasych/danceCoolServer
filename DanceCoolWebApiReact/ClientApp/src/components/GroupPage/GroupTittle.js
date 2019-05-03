import React, { Component } from 'react';
import Axios from 'axios';

export class GroupTittle extends Component {
    static displayName = GroupTittle.name;

    constructor(props) {
        super(props);
        this.state = {
            group: {},
            groupStudents: [],
            loading: true
        }
    }

    componentDidMount() {
        this.populateCurrentGroupData();
        this.populateCurrentGroupStudentsData();
    }
    render() {
        let groupName = this.renderCurrentGroupInfo(this.state.group);
        let students = this.renderCurrentGroupstudents(this.state.groupStudents);
        return (
            <div>
                <h1>Current Group Info</h1>
                {groupName}
                <br />
                {students}
            </div>
        );
    }


    renderCurrentGroupInfo(groupInfo) {
        return (
            <div className="card" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{groupInfo.groupDirection}</h5>
                    <p className="card-text">{groupInfo.groupLevel}</p>
                </div>
            </div>
        );
    }

    renderCurrentGroupstudents(groupStudents) {
        return (
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <th>Прізвище</th>
                        <th>Ім'я</th>
                        <th>Номер телефону</th>
                    </tr>
                </thead>
                <tbody>
                    {groupStudents.map(student =>
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.phoneNumber}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    async populateCurrentGroupData() {
        const id = this.props.match.params.id;
        const responce = await Axios.get(`api/groups/${id}`);
        const data = await responce.data;
        this.setState({ group: data, loading: false });
    }

    async populateCurrentGroupStudentsData() {
        const id = this.props.match.params.id;
        const responce = await Axios.get(`api/groups/${id}/users/`);
        const data = await responce.data;
        console.log(data);
        this.setState({ groupStudents: data, loading: false });
    }
}