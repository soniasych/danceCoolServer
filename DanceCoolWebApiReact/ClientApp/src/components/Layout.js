import React, { Component } from 'react';
import NavMenu from './NavMenu';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

class Layout extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    return (
      <div>
        <NavMenu />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.CheckLogInState())
  };
};

export default connect(null, mapDispatchToProps)(Layout);
