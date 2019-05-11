import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export class Groups extends Component {
    static displayName = Groups.name;

    constructor(props) {
        super(props);
        this.state = { groups: [], loading: true };
    }

    componentDidMount() {
        this.populateGroupData();
    }

    static renderGroupsElements(groups) {
        return (
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <th>Напрямок</th>
                        <th>Рівень</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map(group =>
                        <tr key={group.groupId}>
                            <td><Link to={`/groups/${group.groupId}`}>{group.groupDirection}</Link></td>
                            <td>{group.groupLevel}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let content = Groups.renderGroupsElements(this.state.groups);
        return (
            <div>
                <h1>Активні групи</h1>
                {content}
            </div>);
    }

    async populateGroupData() {
        const responce = await Axios.get('api/groups');
        const data = await responce.data;
        this.setState({ groups: data, loading: false });
    }
}
