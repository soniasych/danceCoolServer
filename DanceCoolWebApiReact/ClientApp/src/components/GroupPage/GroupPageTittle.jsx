import React, { Component } from "react";
import axios from "axios";

export class GroupPageTitle extends Component {
  static displayName = GroupPageTitle.name;
  constructor(id) {
    this.state = {
      goups: [],
      id: 1,
      loading: true
    };
  }

  renderGroupTittle(groups) {}

  componentDidMount() {
    this.GetGroupData();
  }

  async GetGroupData() {
    try {
      return await axios.get("api/groups/", { params: { id: this.state.id } });
    } catch (error) {
      console.error(error);
    }
  }
}
