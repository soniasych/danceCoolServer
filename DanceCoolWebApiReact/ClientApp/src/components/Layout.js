import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import './Layout.css';
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
        <Container className="rootContent">
          {this.props.children}
        </Container>
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
