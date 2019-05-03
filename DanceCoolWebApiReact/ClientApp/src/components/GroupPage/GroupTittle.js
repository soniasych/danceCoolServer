import React, { Component } from 'react';
import Axios from 'axios';

export class GroupTittle extends Component {
    static displayName = GroupTittle.name;

    constructor(props) {
        super(props);
        this.state = {
            group: {},
            loading: true
        }
    }

    componentDidMount() {
        this.populateCurrentGroupData();
    }
    render() {
        let content = this.renderCurrentGroupInfo(this.state.group);
        return (
            <div>
                <h1>Current Group Info</h1>
                {content}
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


    async populateCurrentGroupData() {
        const id = this.props.match.params.id;
        const responce = await Axios.get(`api/groups/${id}`);
        const data = await responce.data;
        console.log(data);
        this.setState({ group: data, loading: false });
    }
}