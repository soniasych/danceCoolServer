import React, { Component } from 'react';
import Carousel from './Carousel'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
