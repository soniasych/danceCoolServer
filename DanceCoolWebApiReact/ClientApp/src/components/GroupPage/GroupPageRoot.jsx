import React, { Component } from "react";
import axios from "axios";

export class GroupPage extends Component {
  static displayName = GroupPage.name;
  constructor() {
    this.state = { group: {}, loading: true };
  }

  renderGroupTittle(group) {}

  componentDidMount() {
    this.populateGroupData();
  }

  static renderGroupsElements(group) {
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Напрямок</th>
            <th>Рівень</th>
          </tr>
        </thead>
        <tbody>
          {group.map(group => (
            <tr key={group.groupId}>
              <td>{group.groupDirection}</td>
              <td>{group.groupLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let content = GroupPage.renderGroupsElements(this.state.group);
    return (
      <div>
        <h1>Активні групи</h1>
        {content}
      </div>
    );
  }

  async GetGroupData() {
    const id = this.props.match.params.id; // we grab the ID from the URL
    const { data } = await axios.get(`/api/groups/${id}`);
    this.setState({ todoItem: data });
  }
}
